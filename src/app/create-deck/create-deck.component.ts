import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-deck',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Assure-toi d'importer CommonModule
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css']
})
export class CreateDeckComponent {
  deckForm: FormGroup;

  constructor(private fb: FormBuilder, private supabaseService: SupabaseService) {
    this.deckForm = this.fb.group({
      title: ['', Validators.required],
      cards: this.fb.array([])  // FormArray pour stocker les cartes
    });
  }

  // Récupérer les cartes dans le formulaire
  get cards() {
    return this.deckForm.get('cards') as FormArray;
  }

  // Ajouter une nouvelle carte au formulaire
  addCard() {
    const cardForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
    this.cards.push(cardForm);
  }

  // Soumettre le formulaire et créer le deck avec les flashcards
  async submitDeck() {
    const deckData = this.deckForm.value;
    try {
      // Créer le deck dans Supabase
      const deck = await this.supabaseService.createDeck({
        title: deckData.title
      });

      if (deck && deck.length > 0) {
        const deckId = deck[0].id;  // Récupérer l'ID du deck créé

        // Créer les flashcards associées au deck
        const flashcardPromises = deckData.cards.map((card: any) => {
          return this.supabaseService.createFlashcard(deckId, card.question, card.answer);
        });

        // Attendre la création de toutes les flashcards
        await Promise.all(flashcardPromises);

        alert('Deck et flashcards créés avec succès !');
        this.deckForm.reset();  // Réinitialiser le formulaire après la création
      } else {
        throw new Error('La création du deck a échoué');
      }
    } catch (error) {
      console.error('Erreur lors de la création du deck et des flashcards:', error);
    }
  }
}
