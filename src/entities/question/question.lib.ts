import { questionDtoTypes } from '@/shared/api/question'
import type { Question, Questions } from './question.types'

export function transQuestionDtoToQuestion(
  articleDto: questionDtoTypes.QuestionOverViewDto,
): Question {
  return {
    ...articleDto,
  }
}

export function transQuestionsDtoDtoToQuestion(
  articlesDto: questionDtoTypes.QuestionOverViewListDto,
): Questions {
  return articlesDto.map((article) => transQuestionDtoToQuestion(article))
}
