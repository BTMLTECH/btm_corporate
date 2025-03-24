import { number, object, string } from "zod";
import { ActivitySchema } from "./activity";

export const TouristSiteSchema = object({
    id: string(),
    name: string(),
    type: string(),
    price: number(),
    region_id: string(),
    activities: ActivitySchema.array()
  });
  