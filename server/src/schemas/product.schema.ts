import { z } from 'zod';

const productSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  compareAtPrice: z.number().positive("Compare at price must be positive").optional(),
  imageUrl: z.string().url("Invalid image URL"),
  stock: z.number().int("Stock must be an integer").min(0, "Stock cannot be negative"),
  categoryId: z.number().int("Category ID must be an integer").positive("Category ID must be positive"),
});

type ProductInput = z.infer<typeof productSchema>;

export { productSchema, ProductInput };