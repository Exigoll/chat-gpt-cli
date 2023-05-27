import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChatCompletionRequestMessage,
  Configuration,
  CreateChatCompletionRequest,
  OpenAIApi,
} from 'openai';

@Injectable()
export class OpenaiService {
  private openAI: OpenAIApi;

  constructor(configService: ConfigService) {
    const apiKey = configService.getOrThrow('OPENAI_API_TOKEN');
    const config = new Configuration({
      apiKey,
    });

    this.openAI = new OpenAIApi(config);
  }

  async generateResponse(messages: ChatCompletionRequestMessage[]) {
    const params: CreateChatCompletionRequest = {
      model: 'gpt-3.5-turbo',
      messages,
    };

    try {
      const res = await this.openAI.createChatCompletion(params);
      return res.data.choices[0].message.content;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
