import { object, string } from "zod";

export const UserSchema = object({
  id: string().min(1).trim().optional(),
  name: string().min(4, "Name is required").max(256),
  email: string().min(4, "Email is required").max(256).trim(),
  phone: string().min(1, "Phone number is invalid").max(256).trim(),
  address: string().max(1024).optional(),
  provider: string().max(20).trim(),
});

export const AuthSchema = object({
  name: string({ required_error: "Name is required" })
    .min(4, "Name is too short")
    .max(256),
  email: string().email().trim(),
  password: string({ required_error: "Password is required" })
    .min(5, "Password is too short")
    .max(120)
    .trim(),
  cPassword: string({ required_error: "Confirm Password is required" })
    .min(5, "Confirm Password is too short")
    .max(120)
    .trim(),
  provider: string().default("email"),
});

export const LoginSchema = object({
  email: string().email().trim(),
  password: string({ required_error: "Password is required" }).trim(),
});

export const ForgotPasswordSchema = object({
  email: string().email("Invalid email address").trim(),
});
