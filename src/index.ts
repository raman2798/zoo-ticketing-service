import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { NOT_FOUND } from 'http-status';
import mongoose from 'mongoose';
import { appConfiguration, loggerConfiguration } from './config';
import { globalErrorHandlerMiddleware } from './middlewares';
import routes from './routes';

const { appVersion, port, mongoDB } = appConfiguration;

const startServer = async (): Promise<void> => {
  try {
    // Create the Express application
    const app: Application = express();

    // Add middleware to parse json request body
    app.use(express.json());

    // Add middleware to parse urlencoded request body
    app.use(express.urlencoded({ extended: true }));

    // Add middleware to enable cors
    app.use(cors());

    // Enable CORS preflight for all routes
    app.options('*', cors());

    // Add API routes
    app.use(`/${appVersion}`, routes);

    // Send back a 404 error for any unknown API request
    app.use((req: Request, res: Response, next: NextFunction) => {
      next({ statusCode: NOT_FOUND, message: 'Not found' });
    });

    // Define global error handler
    app.use(globalErrorHandlerMiddleware);

    // Connect to MongoDB
    await mongoose.connect(mongoDB.url, mongoDB.options);

    loggerConfiguration.info('Connected to MongoDB');

    // Start the server
    const server = app.listen(port, () => {
      loggerConfiguration.info(`Listening on port ${port}...`);
    });

    // Handle server shutdown gracefully
    const exitHandler = (): void => {
      server.close(() => {
        loggerConfiguration.info('Server closed');

        process.exit(0);
      });
    };

    // Handle uncaught exceptions and unhandled rejections
    const unexpectedErrorHandler = (error: Error): void => {
      loggerConfiguration.error('error', error);

      exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);

    process.on('unhandledRejection', unexpectedErrorHandler);
  } catch (error) {
    loggerConfiguration.error('Failed to start server:', error);

    process.exit(1);
  }
};

// Start the server
void startServer();
