import { object, string } from "zod";


export const RegionSchema = object({
  id: string(),
  name: string()
});
