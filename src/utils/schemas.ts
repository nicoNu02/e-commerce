import { z } from "zod";
export const shippingSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  lastName: z.string(),
  dni: z.string().max(8),
  phoneNumber: z.string().max(10),
  address: z.string(),
  houseNumber: z.string(),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  city: z.string(),
  province: z.string(),
  shippingId: z.number(),
  shippingMethod: z.string(),
  shippingDetails: z.string().optional(),
  shippingPrice: z.number(),
});
