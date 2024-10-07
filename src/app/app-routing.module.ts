import { NgModule} from '@angular/core';

import { Routes, RoutesModule } from '@angular/routes';

import { FlashcardGeneratorComponent } from './flashcard-generator/flashcard-generator.component';

const routes: Routes = [
  { path: '', redirectTo: '/generate-flashcards', pathMatch: 'full' },
  { path: 'generate-flashcards', component: FlashcardGeneratorComponent }
];

@NgModule({
  declarations: [RoutesModule],0
  imports: [ RoutesModule ],
  exports: [RoutesModule ],
})
export class AppRoutingModule {}
