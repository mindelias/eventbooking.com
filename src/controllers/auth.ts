import User from '../model/user';
import { generateToken } from '../helpers/helper';
import { hashPassword, comparePassword } from '../services/bcrypt';
import {
  UsersRegisterSchema,
  UsersLoginSchema,
  UserTypeRegister,
  UserTypeLogin,
} from '../validation/auth';

// find all users
export const getAllUsers = () => {
  return User.find();
};

export async function AddNewUsers(users: UserTypeRegister) {
  const { error, value } = UsersRegisterSchema.validate(users, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw error.details[0].message;
  }

  // check if user already  exist in the database
  const UserExist = await User.findOne({ email: value.email });

  if (UserExist) {
    throw new Error('user already exist');
  }

  // Hash Password
    value.password = await hashPassword(value.password);
    console.log(value.password)

  if (!value.password) {
    throw Error('password not hashed sucessfully');
  }

  const user = new User({
      ...value,
      
  });
  return user
    .save()
    .then(result => {
      const payLoad = { id: result._id, email: value.email }; // when loggin in a user
      const token = generateToken(payLoad);
     return { ...result, password: null, _id: result.id, token: token , email:result.email};
       
    })
    .catch(err => {
      throw err;
    });
}
// Get Validated Users
export async function getLoggedUsers(decoded: any) {
  return User.findOne({ _id: decoded.id });
}
// Login users Validation
export async function Login(data: UserTypeLogin) {
  const { error, value } = UsersLoginSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw error.details[0].message;
  }
  // check if user already  exist in the database
  const UserExist = await User.findOne({ email: value.email });

  // check if user exist in the database
  if (!UserExist) {
    throw new Error('incorrect email or password');
  }

  //  check if password matches
  const isMatch = await comparePassword(value.password, UserExist.password);

  if (!isMatch) {
    throw Error('incorrect email or password');
  }
  const payLoad = { id: UserExist._id, email: value.email };
  const token = generateToken(payLoad);
  return { ...UserExist, password: null, token, _id:UserExist._id , email:UserExist.email};
}
