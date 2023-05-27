import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'text-questions' })
export class TextQuestion {
  @Question({
    message: 'Что Вы хотите узнать?',
    name: 'text',
  })
  parseTask(val: string) {
    return val;
  }
}
