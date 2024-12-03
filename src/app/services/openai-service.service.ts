import { Injectable } from '@angular/core';

import OpenAI from 'openai';
import {  
  ChatCompletionMessageParam,
} from 'openai/resources/index.mjs';

const OPEN_AI_API_KEY = "SECRET"

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  async completeChat(messages : ChatCompletionMessageParam[]) {
    var response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.9
    });

    return response.choices[0].message.content;
  }

  async generateImage(prompt: string) {
    const response = await this.openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n:1,
      size: '1024x1024',
      response_format: 'b64_json'
    })
    
    console.log(response);

    return response;
  }
}
