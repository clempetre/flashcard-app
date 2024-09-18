import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [CommonModule],  // Importe CommonModule pour *ngIf
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {
  deck = {
    title: 'Mathématiques',
    cards: [
      { question: '2 + 2 ?', answer: '4' },
      { question: '5 x 6 ?', answer: '30' }
    ]
  };

  currentCardIndex = 0;
  showAnswer = false;

  get currentCard() {
    return this.deck.cards[this.currentCardIndex];
  }

  revealAnswer() {
    this.showAnswer = true;
  }

  nextCard() {
    this.currentCardIndex++;
    this.showAnswer = false;
  }
}
