import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlashcardGeneratorComponent } from './flashcard-generator/flashcard-generator.component';
import { FlashcardService } from './flashcard-generator/flashcard.service';
import { RoutesModule } from './app-routing.module';

@NgModule({
  declarations: [BrowserModule, RoutesModule, FlashcardGeneratorComponent],
  imports: [BrowserModule, RoutesModule],
  providers: [FlashcardService],
})
export class AppModule {}
