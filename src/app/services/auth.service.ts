import { Injectable } from '@angular/core';
import { QuestionService } from './question.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private questionService: QuestionService) {}

  isAuthenticated(): boolean {
    const email = localStorage.getItem('email');
    const questions = this.questionService.getQuestionsFromLS();
    return !!email && !!questions;
  }

  login(email: string) {
    localStorage.setItem('email', email);
  }

  logout() {
    localStorage.removeItem('email');
  }
}
