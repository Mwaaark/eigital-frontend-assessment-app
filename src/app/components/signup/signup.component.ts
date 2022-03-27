import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isSignUpDone = false;

  constructor(
    private authService: AuthService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(({ questions }) => {
      localStorage.setItem('questions', JSON.stringify(questions));
    });
  }

  onSubmit(form: NgForm) {
    const { email } = form.value;
    this.authService.login(email);
    this.isSignUpDone = true;
  }
}
