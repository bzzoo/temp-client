import { z } from 'zod'

export const QuestionDtoSchema = z.object({
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
  commentCount: z.number(),
  upvoteCount: z.number(),
  downvoteCount: z.number(),
  isUpvoted: z.boolean(),
})

export const QuestionListDtoSchema = z.array(QuestionDtoSchema)

export const CreateQuestionDtoSchema = z.object({
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()).default([]),
})

export const UpdateQuestionDtoSchema = z.object({
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()).default([]),
})

const FilterParamsDtoSchema = z.object({
  filterBy: z.array(z.string()),
})

const SortParamsDtoSchema = z.object({
  sortBy: z.array(z.string()),
})

const TagParamsDtoSchema = z.object({
  taggedWith: z.array(z.string()),
})

export const QuestionQueryDtoSchema = z.intersection(
  FilterParamsDtoSchema,
  SortParamsDtoSchema,
  TagParamsDtoSchema,
)
