import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importe RouterModule pour le routage

@Component({
  selector: 'app-root',
  standalone: true,  // Composant autonome
  imports: [RouterModule],  // Ajoute RouterModule pour permettre l'utilisation de <router-outlet>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Flashcard Application';
}
