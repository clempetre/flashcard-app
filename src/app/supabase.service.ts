import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Les clés publiques de Supabase, remplace par tes propres valeurs
const supabaseUrl = 'https://xapskekxxbuoxirhtdjd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcHNrZWt4eGJ1b3hpcmh0ZGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2NjIzMzgsImV4cCI6MjA0MjIzODMzOH0._gv4sAo4y30w_r_s-njlvsBNPio5CEpCdXMGoSRmJfM';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  
  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Créer un deck
  async createDeck(deck: { title: string }): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('decks')
      .insert({ title: deck.title })
      .select();  // Sélectionne les données créées
    
    if (error) {
      throw error;
    }
    return data;
  }

  // Créer une flashcard
  async createFlashcard(deckId: string, question: string, answer: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('flashcards')
      .insert({
        deck_id: deckId,
        question: question,
        answer: answer
      });

    if (error) {
      throw error;
    }
    return data;
  }

  // Récupérer tous les decks
  async getDecks(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('decks')
      .select('*');

    if (error) {
      throw error;
    }
    return data;
  }

  // Récupérer les flashcards associées à un deck spécifique
  async getFlashcardsByDeck(deckId: string): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('flashcards')
      .select('*')
      .eq('deck_id', deckId);

    if (error) {
      throw error;
    }
    return data;
  }

  // Récupérer les decks avec le nombre de flashcards associées
  async getDecksWithFlashcardCount(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('decks')
      .select(`
        id,
        title,
        flashcards:flashcards (id)
      `);  // Jointure explicite avec la table 'flashcards'

    if (error) {
      throw error;
    }

    // Compter les flashcards pour chaque deck
    return data.map((deck: any) => ({
      ...deck,
      flashcardCount: deck.flashcards.length
    }));
  }

  async deleteDeck(deckId: string): Promise<void> {
    try {
      // Supprimer les flashcards associées à ce deck
      const { error: flashcardsError } = await this.supabase
        .from('flashcards')
        .delete()
        .eq('deck_id', deckId);
  
      if (flashcardsError) {
        throw flashcardsError;
      }
  
      // Supprimer le deck
      const { error: deckError } = await this.supabase
        .from('decks')
        .delete()
        .eq('id', deckId);
  
      if (deckError) {
        throw deckError;
      }
  
      console.log('Deck supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du deck :', error);
      throw error;
    }
  }
}
