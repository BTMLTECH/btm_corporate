import { number, object, string } from "zod";

export const TransportationSchema = object({
  id: string(),
  name: string(),
  price: number(),
});
