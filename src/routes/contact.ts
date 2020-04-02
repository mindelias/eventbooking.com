import {Router, Request, Response, NextFunction } from 'express';
 
// import joi from '@hapi/joi';

 
const router = Router();

router.get('/events', async (_req:Request, res:Response, _next:NextFunction) => {
  // const data = await getContacts();

  // if (data.length === 0) {
  //   res.status(204).json({ data });

  //   return;
  // }

  // res.status(200).json({ data });
  res.status(200).json('connected')
});

// router.get('/contact/:contactID', async (req, res) => {
//   const { error, value: contactID } = joi
//     .string()
//     .uuid({ version: 'uuidv4' })
//     .required()
//     .validate(req.params.contactID, { presence: 'required' });

//   if (error) {
//     res.status(400).json({ error });

//     return;
//   }

//   const data = await getContactByID(contactID);

//   if (data.length === 0) {
//     res.status(404).json({ error: 'Contact not found' });

//     return;
//   }

//   res.status(200).json({ data });
// });

// router.post('/contact', async (req, res) => {
//   const contact = req.body;

//   try {
//     const data = await createContact(contact);

//     res.status(201).json({ data });

//     return;
//   } catch (err) {
//     res.status(400).json({ error: err });
//   }
// });

// router.patch('/contact/:contactID', (_req, res) => {
//   res.status(200).json({});
// });

// router.delete('/contact/:contactID', (_req, res) => {
//   res.status(200).json({});
// });

export default router;
