import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Les clés publiques de Supabase, remplace par tes propres valeurs
const supabaseUrl = 'https://xapskekxxbuoxirhtdjd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcHNrZWt4eGJ1b3hpcmh0ZGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2NjIzMzgsImV4cCI6MjA0MjIzODMzOH0._gv4sAo4y30w_r_s-njlvsBNPio5CEpCdXMGoSRmJfM';

interface Deck {
    id: string;
    title: string;
  }

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
          .eq('deck_id', deckId);  // Filtrer par l'ID du deck
      
        if (error) {
          throw error;
        }
        return data;
      }
  
  }