import { http, HttpResponse } from 'msw'

import { questionDtoTypes, questionContractsDto } from '@/shared/api/question'
import { CursorResultType } from '@/shared/api/common/response.contracts'

const questions: questionDtoTypes.QuestionOverViewListDto = [
  {
    id: 1,
    title: 'What is TypeScript?',
    content: 'TypeScript is a typed superset of JavaScript.',
    status: 'active',
    author: {
      id: 1,
      nickname: 'DevUser',
      profileImagePath: '/images/user1.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    tags: [{ id: 1, name: 'TypeScript' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    viewCount: 100,
    commentCount: 10,
    upvoteCount: 50,
    downvoteCount: 5,
    isUpvoted: true,
  },
]

export const handlers = [
  //create a new question
  http.post<never, questionDtoTypes.QuestionOverViewDto>(
    'http://localhost:9090/api/questions',
    async ({ request }) => {
      const data = await request.json()
      const nextId = Math.max(...questions.map((question) => question.id)) + 1

      const newQuestion: questionDtoTypes.QuestionOverViewDto = {
        ...data,
        id: nextId,
        status: 'active',
        author: {
          id: 1,
          nickname: 'MockAuthor',
          profileImagePath: '/images/mock-author.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        tags: data.tags || [],
        createdAt: new Date(),
        updatedAt: new Date(),
        viewCount: 0,
        commentCount: 0,
        upvoteCount: 0,
        downvoteCount: 0,
        isUpvoted: false,
      }

      questions.unshift(newQuestion)
      return HttpResponse.json({ id: nextId })
    },
  ),

  //get all questions
  http.get<never, never, any>(
    'http://localhost:9090/api/questions',
    async ({ request }) => {
      const url = new URL(request.url)
      const size = url.searchParams.get('size')
      const cursor = url.searchParams.get('cursor')
      const lim = Number(size)
      const cur = Number(cursor)
      const paginatedQuestions = questions.slice(cur, cur + lim + 1)
      const nextCursor = cur + lim < questions.length ? cur + lim : null

      const response = {
        result: 'success',
        data: {
          nextCursor: nextCursor,
          isLast: nextCursor === null,
          content: paginatedQuestions,
        },
      }
      return HttpResponse.json(response)
    },
  ),

  //get one question
  http.get<never, questionDtoTypes.QuestionOverViewDto>(
    'http://localhost:9090/api/questions/:id',
    async ({ params }: { params: { id: string } }) => {
      const id = Number(params.id)
      const question = questions.find((question) => question.id === id)

      if (!question) {
        return new HttpResponse(null, { status: 404 })
      }

      return HttpResponse.json(question)
    },
  ),
]
