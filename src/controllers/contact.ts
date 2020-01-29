import joi from '@hapi/joi';
import uuid from 'uuid';

import ContactMongo, { Contact } from '../model/contacts';

export async function getContacts() {
  return ContactMongo.find();
}

export async function getContactByID(contactID: string) {
  return ContactMongo.find({ id: contactID });
}

type CreateContact = Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>;

const createContactSchema = joi.object<CreateContact>({
  firstName: joi
    .string()
    .trim()
    .required(),

  lastName: joi.string().trim(),

  phone: joi
    .string()
    .trim()
    .required(),

  email: joi
    .string()
    .trim()
    .email(),

  company: joi.string().trim()
});

export function createContact(contact: CreateContact) {
  const { error, value } = createContactSchema.validate(contact, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    throw error;
  }

  const id = uuid.v4();
  const date = new Date().toISOString();

  const newContact = new ContactMongo({
    ...value,
    id,
    createdAt: date,
    updatedAt: date
  });

  return newContact.save();
}
