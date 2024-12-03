import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenaiService } from '../../../services/openai-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-art-guesser',
  imports: [CommonModule,FormsModule],
  templateUrl: './art-guesser.component.html',
  styleUrl: './art-guesser.component.css',
})
export class ArtGuesserComponent {
  imageUrl: string | undefined = '';
  imageLoaded = false;

  constructor(private openaiService: OpenaiService) {}

  onSubmitInput(input: string) {
    this.generateImage(input);
  }

  async generateImage(prompt: string) {
    console.log(prompt);

    const response = await this.openaiService.generateImage(prompt);
    this.imageUrl = "data:image/png;base64," + response.data[0].b64_json;
    
    this.imageLoaded = true;
  }
}
