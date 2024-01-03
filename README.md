# Zoo Ticketing Service

This is the repository for the Zoo ticketing Service.

## Getting Started

### Installation Instructions

1. Clone the repository:

```bash
git clone https://github.com/raman2798/zoo-ticketing-service.git.git

cd zoo-ticketing-service
```

2. Install node and npm

3. Install dependencies:

```
npm install
```

4. Set the environment variables:

```bash
cp .env.example .env

# Open .env and modify the environment variables if needed
```

### Starting the Server

To start the server on localhost, run:

```bash
npm run start
```

## Project Structure

```
src/
 |--config/             # Environment variables and configuration related things
 |--controllers/        # Route controllers (controller layer)
 |--interfaces/         # All interfaces
 |--middlewares/        # All middlewares
 |--routes/             # All routes
 |--services/           # All types of services
 |--utils/              # All types of utils
 |--validations/        # All types of validations
 |--index.ts            # App entry point
```
