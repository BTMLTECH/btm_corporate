import { object, string, number } from "zod";
import { UserSchema } from "./user";
import { ActivitySchema } from "./activity";
// import { UserSchema } from "./user";

// export const UserSchema = object({
//   id: string().min(1).trim().optional(),
//   name: string().min(4, "Name is required").max(256),
//   email: string().min(4, "Email is required").max(256).trim(),
//   phone: string().min(1, "Phone number is invalid").max(256).trim(),
//   address: string().max(1024).optional(),
// });

export const DestinationDetailsSchema = object({
  region: string().min(1, "Region is required").max(256),
  tourSites: object({
    name: string().min(1),
    price: number(),
  })
    .array()
    .refine((arr) => arr.length > 0, {
      message: "Select 1 or more options",
    }),
  accommodation: object({
    name: string().min(1, "Accommodation is required"),
    price: number().optional(),
  }),
  transportation: object({
    name: string().min(1),
    price: number(),
  })
    .array()
    .refine((arr) => arr.length > 0, {
      message: "Select 1 or more options",
    }),
  nrOfPeople: number({
    required_error: "Number of people must be 1 or more",
    invalid_type_error: "Please enter a valid number",
  })
    .gte(0, undefined)
    .min(1, "Number of people must be 1 or more")
    .max(10)
    .default(1),
  activities: object({
    name: string().min(1),
    price: number(),
  })
    .array()
    .refine((arr) => arr.length > 0, {
      message: "Select 1 or more options",
    }),
});

export const CreatePackageSchema = object({
  user: UserSchema,
  userID: string(),
  regionID: string(),
  accommodationID: string(),
  // destination: DestinationDetailsSchema,
  region: object({
    id: string().optional(),
    name: string().min(1, "Region is required"),
  }),
  activities: string()
    .array()
    .refine((arr) => arr.length > 0, {
      message: "Select 1 or more options",
    }),
  nrOfPeople: number({
    required_error: "Number of people must be 1 or more",
    invalid_type_error: "Please enter a valid number",
  })
    .gte(0, undefined)
    .min(1, "Number of people must be 1 or more")
    .max(10)
    .default(1),
  tourSites: string()
    .array()
    .refine((arr) => arr.length > 0, {
      message: "Select 1 or more options",
    }),
  transportation: string()
    .array()
    .refine((arr) => arr.length > 0, {
      message: "Select 1 or more options",
    }),
    startDate: string().min(1, "Start date is required"),
    endDate: string().min(1, "End date is required"),
});


// export const UserSchema = object({
//   id: string().min(1).trim().optional(),
//   name: string().min(4, "Name is required").max(256),
//   email: string().min(4, "Email is required").max(256).trim(),
//   phone: string().min(1, "Phone number is invalid").max(256).trim(),
//   address: string().max(1024).optional(),
// });

// export const DestinationDetailsSchema = object({
//   region: string().min(1, "Region is required").max(256),
//   tourSites: object({
//     name: string().min(1),
//     price: number(),
//   })
//     .array()
//     .refine((arr) => arr.length > 0, {
//       message: "Select 1 or more options",
//     }),
//   accommodation: object({
//     name: string().min(1, "Accommodation is required"),
//     price: number().optional(),
//   }),
//   transportation: object({
//     name: string().min(1),
//     price: number(),
//   })
//     .array()
//     .refine((arr) => arr.length > 0, {
//       message: "Select 1 or more options",
//     }),
//   nrOfPeople: number({
//     required_error: "Number of people must be 1 or more",
//     invalid_type_error: "Please enter a valid number",
//   })
//     .gte(0, undefined)
//     .min(1, "Number of people must be 1 or more")
//     .max(10)
//     .default(1),
//   activities: object({
//     name: string().min(1),
//     price: number(),
//   })
//     .array()
//     .refine((arr) => arr.length > 0, {
//       message: "Select 1 or more options",
//     }),
// });

export const PackageSchema = object({
  user: UserSchema,
  region: object({
    id: string().min(1),
    name: string().min(1, "Region is required"),
  }),
  accommodation: object({
    id: string().min(1, "Accommodation ID is required").default(""),
    name: string().min(1, "Accommodation is required").default("Please select accommodation"),
    price: number().optional(),
  }),
  activities: object({
    id: string().min(1),
    name: string().min(1),
    price: number(),
  })
    .array()
    .refine((arr) => arr.length > 0, {
      message: "Select 1 or more options",
    }),
  nrOfPeople: number({
    required_error: "Number of people must be 1 or more",
    invalid_type_error: "Please enter a valid number",
  })
    .gte(0, undefined)
    .min(1, "Number of people must be 1 or more")
    .max(10)
    .default(1),
  tourSites: object({
    id: string().min(1),
    name: string().min(1),
    price: number(),
    region_id: string(),
    activities: ActivitySchema.array()
  })
    .array()
    .refine((arr) => arr.length > 0, {
      message: "Select 1 or more options",
    }),
  transportation: object({
    id: string().min(1),
    name: string().min(1),
    price: number(),
  })
    .array()
    .refine((arr) => arr.length > 0, {
      message: "Select 1 or more options",
    }),
    startDate: string().min(1, "Start date is required"),
    endDate: string().min(1, "End date is required"),

    // paymentData: object({
    //   cardNumber: string().min(16, "Card number is invalid"),
    //   cvv: string().min(1, "Cvv is invalid").max(3, "Invalid cvv"),
    //   expiryMonth: string().min(1, "Month is invalid").max(2, "Invalid month"),
    //   expiryYear: string().min(1, "Year is invalid").max(2, "Invalid year"),
    //   city: string().min(0, "Card number is invalid").default(""),
    //   address: string().min(0, "Address is required").default(""),
    //   state: string().min(0, "State is required").default(""),
    //   country: string().min(0, "Country is required").default(""),
    //   zipcode: string().min(0, "Zipcode is required").default(""),
    //   mode: string().min(0, "Mode is required")
    // })
});
