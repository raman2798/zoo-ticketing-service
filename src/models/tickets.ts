import { model, Schema } from 'mongoose';
import { paginationAndDownload, toJSON } from './plugins';
import { ITicket, ITicketModel } from '../interfaces/tickets';

const ticketSchema: Schema<ITicket> = new Schema<ITicket>(
  {
    guests: {
      type: Map,
      of: Number,
      validate: {
        validator: function (value: Map<string, number>) {
          return [...value.values()].every((val) => typeof val === 'number');
        },
        message: 'All values must be numbers.',
      },
    },
    ticketId: { type: String, unique: true },
    totalGuests: { type: Number },
    totalCharges: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

// add plugin pagination and download for populate
ticketSchema.plugin(paginationAndDownload);

// add plugin that converts mongoose to json
ticketSchema.plugin(toJSON);

export default model<ITicket, ITicketModel>('tickets', ticketSchema);
