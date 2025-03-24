import { number, object, string } from "zod";

export const ActivitySchema = object({
  id: string(),
  name: string(),
  description: string(),
  price: number()
});
