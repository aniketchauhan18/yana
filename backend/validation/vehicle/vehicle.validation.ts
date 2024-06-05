import * as z from 'zod'

export const vehicleSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.number().int().positive(),
  price: z.number().int().positive(),
  category: z.enum(['car', 'truck', 'motorcycle', 'bus', 'van', 'suv', 'bike','bicycle', 'other']),
  isAvaliable: z.boolean(),
  owner: z.string()
});

export type VehicleSchemaType = z.infer<typeof vehicleSchema>