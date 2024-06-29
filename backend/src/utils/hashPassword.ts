import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const decodePassword = async (password: string, encrypted: string) => {
  const decodedPass = await bcrypt.compare(password, encrypted);
  return decodedPass;
};
