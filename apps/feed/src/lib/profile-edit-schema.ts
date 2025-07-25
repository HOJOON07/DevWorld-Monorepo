import { type ZodType, z } from 'zod';
import { ProfileEditMessages as M } from './profile-edit.messages';

// null, ''을 undefined로 변환하는 헬퍼
const toUndefined = (val: unknown) => {
  if (val === '' || val === null) return undefined;
  return val;
};

export const ProfileEditSchema = z.object({
  devName: z.string().min(2, { message: M.devName.min }).max(16, { message: M.devName.max }),

  position: z.preprocess(
    toUndefined,
    z.string().min(2, { message: M.position.min }).max(16, { message: M.position.max }).optional(),
  ) as ZodType<string | undefined>,

  bio: z.preprocess(
    toUndefined,
    z.string().min(2, { message: M.bio.min }).max(30, { message: M.bio.max }).optional(),
  ) as ZodType<string | undefined>,

  location: z.preprocess(
    toUndefined,
    z.string().min(2, { message: M.location.min }).max(8, { message: M.location.max }).optional(),
  ) as ZodType<string | undefined>,

  github: z.preprocess(toUndefined, z.string().optional()) as ZodType<string | undefined>,

  email: z.string().email({ message: M.email.invalid }),

  linkedin: z.preprocess(
    toUndefined,
    z.string().url({ message: M.linkedin.invalid }).optional(),
  ) as ZodType<string | undefined>,

  instagram: z.preprocess(toUndefined, z.string().optional()) as ZodType<string | undefined>,

  socialEtc: z.preprocess(
    toUndefined,
    z.string().url({ message: M.socialEtc.invalid }).optional(),
  ) as ZodType<string | undefined>,

  image: z.preprocess(toUndefined, z.string().optional()) as ZodType<string | undefined>,
});

export type ProfileEditType = z.infer<typeof ProfileEditSchema>;
