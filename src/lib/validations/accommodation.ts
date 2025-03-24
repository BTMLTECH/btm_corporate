import { number, object, string } from "zod";

export const AccommodationSchema = object({
  id: string(),
  name: string(),
  type: string(),
  price: number(),
});
