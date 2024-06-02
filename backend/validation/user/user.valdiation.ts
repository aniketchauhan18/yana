import * as z from 'zod';

export const userRegisterationValidation = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string()
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})
