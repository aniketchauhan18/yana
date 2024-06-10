import * as z from "zod";

export const vehicleSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.string(),
  price: z.number().int().positive(),
  category: z.enum([
    "Car",
    "Truck",
    "Motorcycle",
    "Bus",
    "Van",
    "Suv",
    "Bike",
    "Bicycle",
    "Other",
  ]),
  isAvailable: z.enum(["Yes", "No"]),
  ownerId: z.string(),
});

export type VehicleSchemaType = z.infer<typeof vehicleSchema>;
