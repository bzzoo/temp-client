import { z } from 'zod'

export const TabFilterSchema = z
  .union([
    z.literal('newest'),
    z.literal('active'),
    z.literal('bountied'),
    z.literal('unanswered'),
  ])
  .default('newest')

export const FilterSchema = z.object({
  tabFilter: TabFilterSchema,
  tags: z.array(z.string()).optional(),
})

export const QuestionSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  status: z.string(),
  author: z.object({
    id: z.number(),
    nickname: z.string(),
    profileImagePath: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  viewCount: z.number(),
  answerCount: z.number(),
  upvoteCount: z.number(),
  downvoteCount: z.number(),
  isUpvoted: z.boolean(),
})

export const QuestionsSchema = z.array(QuestionSchema)
