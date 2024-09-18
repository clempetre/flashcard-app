import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {
  flashcards: any[] = [];
  deckId: string | null = null;
  currentIndex: number = 0;  // Index de la carte actuellement affichée

  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService, private router: Router) {}

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('deckId');
    if (this.deckId) {
      this.loadFlashcards(this.deckId);
    }
  }

  async loadFlashcards(deckId: string) {
    try {
      this.flashcards = await this.supabaseService.getFlashcardsByDeck(deckId);
    } catch (error) {
      console.error('Erreur lors du chargement des flashcards', error);
    }
  }

  goBack() {
    this.router.navigate(['/decks']);
  }

  // Naviguer entre les cartes
  nextCard() {
    if (this.currentIndex < this.flashcards.length - 1) {
      this.currentIndex++;
    }
  }

  prevCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
