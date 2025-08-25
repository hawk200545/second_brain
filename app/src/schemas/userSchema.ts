import * as z from "zod";
export const usernmaeSchema = z
  .string()
  .min(3, { message: "name is too short" })
  .max(10, { message: "name is too long" });
export const passwordSchema = z
  .string()
  .min(8, { message: "passord is too short" })
  .max(20, { message: "password is too long" })
  .regex(/^(?=.*[a-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      "Password must contain atleat 1 Uppercase, 1 LowerCase, 1 Digit and a Special Character",
  });