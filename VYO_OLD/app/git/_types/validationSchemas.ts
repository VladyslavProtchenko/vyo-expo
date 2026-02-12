import z from "zod";

// Reusable email field schema
const emailFieldSchema = z.string()
  .min(1, 'Email is required')
  .email('Please enter a valid email')
  .max(254, 'Email is too long')
  .toLowerCase()
  .trim();

// Reusable password field schema
const passwordFieldSchema = z.string()
  .min(1, 'Password is required')
  .min(8, 'At least 8 characters')
  .regex(/[A-Z]/, 'At least one uppercase letter required (A–Z)')
  .regex(/[a-z]/, 'At least one lowercase letter required (a–z)')
  .regex(/[0-9]/, 'At least one digit required (0–9)')
  .regex(/[@$!%*?&]/, 'At least one special character required (@$!%*?&)');

export const loginSchema = z.object({
  email: emailFieldSchema,
  password: passwordFieldSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const emailSchema = z.object({
  email: emailFieldSchema,
});
export type EmailFormData = z.infer<typeof emailSchema>;

export const passwordSchema = z.object({
  password: passwordFieldSchema,
  confirmPassword: passwordFieldSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
export type PasswordFormData = z.infer<typeof passwordSchema>;

export const registrationSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: emailFieldSchema,
  password: passwordFieldSchema,
});
export type RegistrationFormData = z.infer<typeof registrationSchema>;