import { z } from "zod";

export const createOrderSchema = () => { //<T extends TFunction>(t: T) => {
  return z.object({
    productId: z.string(),
    quantity: z.number(),
    note: z.string().nullable(),
    addressId: z.string(),
    paymentMethod: z.number().nullable(),
    cartProducts: z.array(z.object({
      productId: z.string(),
      quantity: z.number()
    }))
  })
}

export type CreateOrderSchemaType = z.infer<ReturnType<typeof createOrderSchema>>;