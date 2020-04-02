import joi from '@hapi/joi';
import Event from '../model/event';
import { EventTypePartial } from '../model/event';

export const getEvents = () => {
  return Event.find();
};

const createContactSchema = joi.object({
  title: joi
    .string()
    .trim()
    .required(),

  description: joi
    .string()
    .trim()
    .required(),

  price: joi.number().required(),
});

export function AddEvent(eventInput: EventTypePartial) {
  const { error, value } = createContactSchema.validate(eventInput, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw error;
  }

  const event = new Event({
    ...value,
  });

  return event.save();
}
