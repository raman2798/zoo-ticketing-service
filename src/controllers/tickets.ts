import { NextFunction, Request, Response } from 'express';
import { floor, get, toNumber } from 'lodash';
import { ticketService } from '../services';
import { transformErrorUtils, transformResponseUtils } from '../utils';
import { IOptionsWithPopulate } from '../interfaces';
import { ITicket } from '../interfaces/tickets';

const { create, getAllTickets, getTicketByQuery, getUniqueTicketId } = ticketService;

const createTicket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticketId = await getUniqueTicketId();

    const createBody = { ...get(req, 'body'), ticketId } as ITicket;

    const ticket = await create(createBody);

    res.json(
      transformResponseUtils({
        result: ticket,
      }),
    );
  } catch (error) {
    next(transformErrorUtils(error));
  }
};

const readAllTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      query: { page, limit },
    } = req;

    const options: IOptionsWithPopulate = {
      page: floor(toNumber(page)),
      limit: floor(toNumber(limit)),
    };

    const tickets = await getAllTickets(options);

    res.json(
      transformResponseUtils({
        result: tickets,
      }),
    );
  } catch (error) {
    next(transformErrorUtils(error));
  }
};

const readById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { ticketId },
    } = req;

    const query = { _id: ticketId };

    const ticket = await getTicketByQuery(query);

    res.json(
      transformResponseUtils({
        result: {
          data: ticket,
        },
      }),
    );
  } catch (error) {
    next(transformErrorUtils(error));
  }
};

const readByTicketId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { ticketId },
    } = req;

    const query = { ticketId };

    const ticket = await getTicketByQuery(query);

    res.json(
      transformResponseUtils({
        result: {
          data: ticket,
        },
      }),
    );
  } catch (error) {
    next(transformErrorUtils(error));
  }
};

export { createTicket, readAllTickets, readById, readByTicketId };
