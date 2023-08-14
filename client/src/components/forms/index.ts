import * as z from "zod"
 
export const signUpSchema = z.object({
  username: z.string().min(8).max(32),
  email: z.string().min(8).max(64),
  password: z.string().min(8).max(32),
})

export const signInSchema = z.object({
    email: z.string().min(8).max(64),
    password: z.string().min(8).max(32),
  })