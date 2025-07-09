import { z } from 'zod';

export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_MIN: 'Password must be at least 8 characters',
  PASSWORD_MAX: 'Password must be at most 16 characters',
  DEVNAME_MIN: 'DevWorld nickname must be at least 2 characters.',
  DEVNAME_MAX: 'DevWorld nickname must be at most 12 characters.',
  PASSWORD_CONFIRM: 'Passwords do not match.',
  VERIFICATION_CODE_REQUIRED: 'Verification Code must be 6 digits',
  VERIFICATION_CODE_REGEX: 'Verification code must contain only numbers',
};

export const SignInSchema = z.object({
  email: z.string().trim().email({
    message: ERROR_MESSAGES.INVALID_EMAIL,
  }),
  password: z
    .string()
    .min(8, { message: ERROR_MESSAGES.PASSWORD_MIN })
    .max(16, { message: ERROR_MESSAGES.PASSWORD_MAX }),
});

export const SignUpSchema = z
  .object({
    email: z.string().trim().email({
      message: ERROR_MESSAGES.INVALID_EMAIL,
    }),
    password: z
      .string()
      .min(8, { message: ERROR_MESSAGES.PASSWORD_MIN })
      .max(16, { message: ERROR_MESSAGES.PASSWORD_MAX }),
    passwordConfirm: z
      .string()
      .min(8, { message: ERROR_MESSAGES.PASSWORD_MIN })
      .max(16, { message: ERROR_MESSAGES.PASSWORD_MAX }),
    devName: z
      .string()
      .min(2, { message: ERROR_MESSAGES.DEVNAME_MIN })
      .max(12, { message: ERROR_MESSAGES.DEVNAME_MAX }),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: ERROR_MESSAGES.PASSWORD_CONFIRM,
    path: ['passwordConfirm'],
  });

export const VerificationCodeSchema = z.object({
  verificationCode: z
    .string()
    .length(6, { message: ERROR_MESSAGES.VERIFICATION_CODE_REQUIRED })
    .regex(/^\d{6}$/, { message: ERROR_MESSAGES.VERIFICATION_CODE_REGEX }),
});

export const EmailSentSchema = z.object({
  email: z.string().trim().email({
    message: ERROR_MESSAGES.INVALID_EMAIL,
  }),
});

export const PasswordResetSchema = z.object({
  password: z
    .string()
    .min(8, { message: ERROR_MESSAGES.PASSWORD_MIN })
    .max(16, { message: ERROR_MESSAGES.PASSWORD_MAX }),
  passwordConfirm: z
    .string()
    .min(8, { message: ERROR_MESSAGES.PASSWORD_MIN })
    .max(16, { message: ERROR_MESSAGES.PASSWORD_MAX }),
});

export type SignInType = z.infer<typeof SignInSchema>;
export type SignUpType = z.infer<typeof SignUpSchema>;
export type VerificationCodeType = z.infer<typeof VerificationCodeSchema>;
export type EmailSentType = z.infer<typeof EmailSentSchema>;
export type PasswordResetType = z.infer<typeof PasswordResetSchema>;
