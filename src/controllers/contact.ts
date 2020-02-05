import joi from '@hapi/joi';

import { db, sql, ContactsTable } from '../model/contacts-postgres';

export async function getContacts() {
  return db.query(sql`SELECT * FROM contacts;`);
}

export async function getContactByID(contactID: string) {
  return db
    .query(sql`SELECT * FROM contacts WHERE id= ${contactID}`)
    .then(data => {
      return data[0];
    });
}

type CreateContact = Omit<ContactsTable, 'id' | 'created_at' | 'updated_at'>;

const createContactSchema = joi.object<CreateContact>({
  first_name: joi
    .string()
    .trim()
    .required(),

  last_name: joi.string().trim(),

  phone: joi
    .string()
    .trim()
    .required(),

  email: joi
    .string()
    .trim()
    .email(),

  company: joi.string().trim(),
});

export function createContact(contact: CreateContact) {
  const { error, value } = createContactSchema.validate(contact, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw error;
  }

  return db.query(
    sql`INSERT INTO contacts(first_name, last_name, phone, email, company)
    VALUES (${value.first_name}, ${value.last_name}, ${value.phone}, ${value.email}, ${value.company})
    RETURNING *
    `
  );
}
