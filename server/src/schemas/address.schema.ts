import { z } from 'zod';

const addressSchema = z.object({
  userId: z.number().int("User ID must be an integer").positive("User ID must be positive"),
  street: z.string().min(1, "Street is required").max(255, "Street is too long"),
  city: z.string().min(1, "City is required").max(100, "City is too long"),
  state: z.string().min(1, "State is required").max(100, "State is too long"),
  country: z.string().min(1, "Country is required").max(100, "Country is too long"),
  zipCode: z.string().min(1, "Zip code is required").max(20, "Zip code is too long"),
  isDefault: z.boolean().optional().default(false),
});

type AddressInput = z.infer<typeof addressSchema>;

export { addressSchema, AddressInput };