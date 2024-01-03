import Joi from 'joi';
import { merge } from 'lodash';
import { objectId } from './custom';

const mongodbObjectId = Joi.custom(objectId);

const baseSchema = {
  totalGuests: Joi.number(),
  guests: Joi.object().pattern(Joi.string(), Joi.number().required()),
  totalCharges: Joi.number(),
};

const create = {
  body: Joi.object().keys(
    merge({}, baseSchema, {
      guests: baseSchema.guests.required(),
      totalGuests: baseSchema.totalGuests.required(),
      totalCharges: baseSchema.totalCharges.required(),
    }),
  ),
};

const getTicketById = {
  params: Joi.object().keys({
    ticketId: mongodbObjectId.required(),
  }),
};

const getTicketByTicketId = {
  params: Joi.object().keys({
    ticketId: Joi.string().trim(),
  }),
};

export { create, getTicketById, getTicketByTicketId };
