import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { OpenaiService } from 'src/openai/openai.service';

@Command({
  name: 'gpt',
  description: 'Запрос к OPEN AI',
  options: {
    isDefault: true,
  },
})
export class GPTCommand extends CommandRunner {
  constructor(
    private readonly inquirer: InquirerService,
    private readonly openaiService: OpenaiService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const response = await this.inquirer.ask<{ text: string }>(
      'text-questions',
      undefined,
    );
    const aiResponse = await this.openaiService.generateResponse([
      {
        role: 'system',
        content: 'Выступай в роли ИТ-эксперта и развернуто отвечай на вопросы',
      },
      { role: 'user', content: response.text },
    ]);
    console.log(aiResponse);
  }
}
