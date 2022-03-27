import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get<any>('assets/questions.json');
  }

  getQuestionsFromLS() {
    return JSON.parse(localStorage.getItem('questions'));
  }
}
