import bcrypt from 'bcryptjs';
 

export const hashPassword = (password: string) => {
    // if (!process.env.BCRYPT_SALT) {
    //     return
    // }
     const salt = process.env.BCRYPT_SALT ? Number(process.env.BCRYPT_SALT): 10
  const hash = bcrypt.genSaltSync(salt);
  return bcrypt.hash(password, hash);
};

export const comparePassword = (password:string, hash:string) =>
  bcrypt.compare(password, hash);
