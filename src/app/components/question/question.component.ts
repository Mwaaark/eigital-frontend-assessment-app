import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { Question } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/services/question.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  email: string | null = '';
  points = 0;
  correctAnswers = 0;

  questionsList: Question[] = [];
  currentQuestionIndex = 0;
  interval: any;
  timeoutId: any = 0;
  counter = 15;

  isAnswerSubmitted = false;
  isCorrectAnswer = false;
  isQuizComplete = false;

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.getQuestions();
    this.startTimer();
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe(({ questions }) => {
      this.questionsList = questions;
      console.log(this.questionsList);
    });
  }

  startTimer() {
    this.interval = interval(1000).subscribe((data) => {
      this.counter--;
      if (this.counter === 0) {
        this.checkAnswer();
      }
    });

    this.timeoutId = setTimeout(() => {
      this.interval.unsubscribe();
    }, 15000);
  }

  clearTimer() {
    this.interval.unsubscribe();
    clearTimeout(this.timeoutId);
  }

  checkAnswer(form?: NgForm) {
    this.clearTimer();
    this.isAnswerSubmitted = true;

    // find correct answer
    const correctAnswer = this.questionsList[
      this.currentQuestionIndex
    ].answerChoices.find((el) => el.correct);

    // check if correct answer equal to selected answer
    if (form && correctAnswer?.answerText === form.value.answerInput) {
      this.points += 100;
      this.isCorrectAnswer = true;
      this.correctAnswers++;
    }

    this.isQuizComplete =
      this.currentQuestionIndex === this.questionsList.length - 1;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.reset();
  }

  reset() {
    this.retryQuiz();
    this.isAnswerSubmitted = false;
    this.isCorrectAnswer = false;
    this.counter = 15;
    this.clearTimer();
    this.startTimer();
  }

  retryQuiz() {
    if (this.isQuizComplete) {
      this.currentQuestionIndex = 0;
      this.isQuizComplete = false;
      this.points = 0;
    }
  }

  logout() {
    localStorage.removeItem('email');
    this.router.navigate(['']);
  }

  seeResults() {
    swal.fire({
      title: `Your total earning points: ${this.points}`,
      text: `You got ${this.correctAnswers} out of ${this.questionsList.length} correct`,
      icon: 'info',
      confirmButtonColor: '#0d6efd',
    });
  }
}
