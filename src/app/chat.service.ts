import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8083/api/chat/ask';  // API URL

  constructor(private http: HttpClient) {}

  // Send the user's chat prompt to the backend
  sendChatPrompt(message: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, { prompt: message }, { responseType: 'text' as 'json' }); // Explicitly tell TypeScript it's a string
  }
}
