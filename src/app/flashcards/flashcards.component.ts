import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {
  flashcards: any[] = [];
  deckId: string | null = null;
  currentIndex: number = 0;
  flashcardForm: FormGroup;
  showModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.flashcardForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

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

  // Méthode pour supprimer une flashcard
  async deleteFlashcard(flashcardId: string) {
    if (confirm('Voulez-vous vraiment supprimer cette flashcard ?')) {
      try {
        await this.supabaseService.deleteFlashcard(flashcardId);
        this.loadFlashcards(this.deckId!); // Recharger les flashcards après la suppression
      } catch (error) {
        console.error('Erreur lors de la suppression de la flashcard', error);
      }
    }
  }

  goBack() {
    this.router.navigate(['/decks']);
  }

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

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async submitFlashcard() {
    if (this.flashcardForm.valid && this.deckId) {
      const { question, answer } = this.flashcardForm.value;

      try {
        await this.supabaseService.createFlashcard(this.deckId, question, answer);
        this.loadFlashcards(this.deckId);
        this.flashcardForm.reset();
        this.closeModal();
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la flashcard', error);
      }
    }
  }
}
