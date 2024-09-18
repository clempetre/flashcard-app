import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importer FormsModule pour ngModel

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Ajouter FormsModule pour les formulaires
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent implements OnInit {
  decks: any[] = [];
  isModalOpen = false;  // Gérer l'état de la modale
  newDeckTitle: string = '';  // Titre du nouveau deck

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  ngOnInit() {
    this.loadDecks();
  }

  async loadDecks() {
    try {
      this.decks = await this.supabaseService.getDecksWithFlashcardCount();
    } catch (error) {
      console.error('Erreur lors du chargement des decks', error);
    }
  }

  viewFlashcards(deckId: string) {
    this.router.navigate([`/decks/${deckId}/flashcards`]);
  }

  async deleteDeck(deckId: string) {
    if (confirm('Voulez-vous vraiment supprimer ce deck ?')) {
      try {
        await this.supabaseService.deleteDeck(deckId);
        this.loadDecks();
      } catch (error) {
        console.error('Erreur lors de la suppression du deck', error);
      }
    }
  }

  // Ouvrir la modale
  openModal() {
    this.isModalOpen = true;
  }

  // Fermer la modale
  closeModal() {
    this.isModalOpen = false;
    this.newDeckTitle = '';  // Réinitialiser le titre du deck
  }

  // Créer un deck
  async createDeck() {
    if (this.newDeckTitle.trim() === '') return;
    try {
      await this.supabaseService.createDeck({ title: this.newDeckTitle });
      this.closeModal();
      this.loadDecks();  // Recharger la liste des decks après la création
    } catch (error) {
      console.error('Erreur lors de la création du deck', error);
    }
  }
}
