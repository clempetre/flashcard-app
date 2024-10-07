import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  private apiUrl = 'https://api.openai.com/v1/completions';
  private apiKey = 'YOUR-API-KEY-HERE;';

  constructor(private http: HttpClient) {}

  generateFlashcards(theme: string): Observable<any> {
    const prompt = `*Generate flashcards for theme: ${theme}*. Format: Question -> Answer.`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `"Bearer ${this.apiKey}`,
    };
    const body = {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
      n:5,
    };
    return this.http.post(this.apiUrl, body, { headers });
}
}
