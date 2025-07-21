import { z } from 'zod';

const ARTICLE_TITLE_MIN_LENGTH_MSG = 'The article title must be at least 2 characters.';
const ARTICLE_TITLE_MAX_LENGTH_MSG = 'The article title must be no more than 150 characters.';
const ARTICLE_DESCRIPTION_MIN_LENGTH_MSG = 'The article description must be at least 2 characters.';
const ARTICLE_DESCRIPTION_MAX_LENGTH_MSG =
  'The article description must be no more than 200 characters.';

export const PublishSchema = z.object({
  title: z
    .string()
    .min(2, { message: ARTICLE_TITLE_MIN_LENGTH_MSG })
    .max(150, { message: ARTICLE_TITLE_MAX_LENGTH_MSG }),

  description: z
    .string()
    .min(2, { message: ARTICLE_DESCRIPTION_MIN_LENGTH_MSG })
    .max(200, { message: ARTICLE_DESCRIPTION_MAX_LENGTH_MSG }),

  thumbnails: z.string().optional(),

  contents: z.any(),

  isPrivate: z.enum(['private', 'open']),
});

export type PublishType = z.infer<typeof PublishSchema>;
