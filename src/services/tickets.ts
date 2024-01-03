import { NOT_FOUND } from 'http-status';
import { isEmpty, split } from 'lodash';
import { Document, FilterQuery } from 'mongoose';
import { TicketModel } from '../models';
import { IOptions } from '../interfaces';
import { ITicket } from '../interfaces/tickets';
import { IPaginationResult } from '../models/plugins/interfaces';

// Create a ticket
const create = async (createBody: ITicket): Promise<ITicket> => {
  const ticket = await TicketModel.create(createBody);

  return ticket;
};

// Get all tickets
const getAllTickets = async (options: IOptions): Promise<ITicket[] | IPaginationResult<Document>> => {
  const tickets = await TicketModel.paginationAndDownload(options);

  return tickets;
};

// Get ticket by query
const getTicketByQuery = async (query: FilterQuery<Document>): Promise<ITicket> => {
  const ticket = await TicketModel.find(query);

  if (isEmpty(ticket)) {
    throw { statusCode: NOT_FOUND, message: 'No ticket found' };
  }

  return ticket[0];
};

// Get unique ticket id
const getUniqueTicketId = async (): Promise<string> => {
  const ticket = await TicketModel.findOne({}).sort({ createdAt: -1 });

  let number = 1;

  if (ticket) {
    const splitResult = split(ticket.ticketId, '_');

    number = Number(splitResult[1]) + 1;
  }

  return `ZOO_${number}`;
};

export { create, getAllTickets, getTicketByQuery, getUniqueTicketId };
