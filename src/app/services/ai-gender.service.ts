import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiGenderService {
  constructor(private http: HttpClient) {}

  API_KEY: string = 'AIzaSyAP7mmpHqxqy7t7rVGPe4TlXwaRfT41pC8';
  URL: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.API_KEY}`;
  previousResponses: { prompt: string; response: string }[] = [];

  callAI(prompt: string): Observable<any> {
    const messages = [
      ...this.previousResponses.flatMap(({ prompt, response }) => [
        { role: 'user', parts: [{ text: prompt }] },
        { role: 'model', parts: [{ text: response }] },
      ]),
      { role: 'user', parts: [{ text: prompt }] },
    ];
    const payload = { contents: messages };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.URL, payload, { headers });
  }
}
