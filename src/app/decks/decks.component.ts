import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importer Router pour la navigation
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';  // Importer CommonModule pour utiliser *ngIf et *ngFor

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [CommonModule],  // Assure-toi d'importer CommonModule
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent implements OnInit {
  decks: any[] = [];

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  ngOnInit() {
    this.loadDecks();
  }

  async loadDecks() {
    try {
      this.decks = await this.supabaseService.getDecks();
    } catch (error) {
      console.error('Erreur lors du chargement des decks', error);
    }
  }

  viewFlashcards(deckId: string) {
    this.router.navigate([`/decks/${deckId}/flashcards`]);  // Navigation vers la route dynamique
  }
}
