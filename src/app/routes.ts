import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SessionComponent } from './session/session.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { DecksComponent } from './decks/decks.component';
import { FlashcardsComponent } from './flashcards/flashcards.component'; // Nouveau composant pour les flashcards

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Page d'accueil
  { path: 'session', component: SessionComponent }, // Page de session
  { path: 'create-deck', component: CreateDeckComponent }, // Page de création de deck
  { path: 'decks', component: DecksComponent }, // Page des decks
  { path: 'decks/:deckId/flashcards', component: FlashcardsComponent }, // Route dynamique pour les flashcards d'un deck
  { path: '**', redirectTo: '' }  // Redirection vers la page d'accueil pour les routes inconnues
];
