import * as z from "zod";

export const userRegisterationValidation = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  number: z.number().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  pincode: z.number().optional(),
  address: z.number().optional(),
  dateOfBirth: z.date().optional()
})

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
