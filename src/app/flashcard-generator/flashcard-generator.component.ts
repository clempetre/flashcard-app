import { Component } from '@angular/core';
import { FlashcardService } from './flashcard.service';

@Component({selector: 'app-flashcard-generator', templateUrl: './flashcard-generator.component.html', styleUrls: ['./flashcard-generator.component.css']})

export class FlashcardGeneratorComponent {
  theme: string = '';
  flashcards: { question: string; answer: string } = [];
  constructor(private flashcardService: FlashcardService) {}

  generateFlashcards(): void {
    if (this.theme) {
      this.flashcardService.generateFlashcards(this.theme).subscribe((response)=> {
        this.flashcards = response.choices.map((choice: any) => {
          const [Question, Answer] = choice.text.split('->');
          return { question, answer: answer.trim() };
        });
      });
    }
  }
}
