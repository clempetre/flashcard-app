import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import du routeur
import { MatButtonModule } from '@angular/material/button';  // Import MatButtonModule pour les boutons
import { MatCardModule } from '@angular/material/card';  // Import MatCardModule pour les cartes
import { RouterModule } from '@angular/router';  // Import RouterModule pour la navigation

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterModule],  // Ajoute RouterModule pour gérer le routage
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  startSession() {
    this.router.navigate(['/session']);  // Redirige vers la page de session
  }

  createDeck() {
    this.router.navigate(['/create-deck']);  // Redirige vers la page pour créer un deck
  }

  viewDecks() {
    this.router.navigate(['/decks']);  // Redirige vers la page d'affichage des decks
  }
}
