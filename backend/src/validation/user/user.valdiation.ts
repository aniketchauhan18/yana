import * as z from "zod";

export const userRegisterationValidation = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const userUpdateValidation = z.object({
  username: z.string(),
  email: z.string().email(),
  number: z.number().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  pincode: z.number().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
