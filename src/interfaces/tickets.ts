import { Document, FilterQuery, Model } from 'mongoose';
import { IOptionsWithPopulate } from './index';
import { IPaginationResult } from '../models/plugins/interfaces';

export interface ITicket extends Document {
  guests: {
    [key: string]: number;
  };
  ticketId: string;
  totalGuests: number;
  totalCharges: number;
  isActive: boolean;
}

export interface ITicketModel extends Model<ITicket> {
  paginationAndDownload(options: IOptionsWithPopulate, query?: FilterQuery<Document>): Promise<IPaginationResult<Document>>;
}
