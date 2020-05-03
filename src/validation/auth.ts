import joi from '@hapi/joi';

export type UserType = {
  _id: string;
  fullname: string;
  password: string;
  email: number;
  createdAt: Date | string;
  deletedAt: Date | string;
  updatedAt: Date | string;
};

export type UserTypeRegister = Pick<
  UserType,
  'fullname' | 'password' | 'email'
>;
export type UserTypeLogin = Pick<UserType, 'email' | 'password'>;

export const UsersRegisterSchema = joi.object<UserTypeRegister>({
  fullname: joi
    .string()
    .trim()
    .required(),

  email: joi
    .string()
    .trim()
    .email()
    .required(),

  password: joi
    .string()
    .trim()
    .required()
    .min(6),
});

export const UsersLoginSchema = joi.object<UserTypeRegister>({
  email: joi
    .string()
    .trim()
    .email()
    .required(),

  password: joi
    .string()
    .trim()
    .required()
    .min(6),
});
