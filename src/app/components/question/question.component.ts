import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { interval } from 'rxjs';
import { AnswerChoices, Question } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  email: string | null = '';
  points = 0;

  questionsList: Question[] = [];
  currentQuestionIndex = 0;
  interval: any;
  timeoutId: any = 0;
  counter = 15;

  isAnswerSubmitted = false;
  isCorrectAnswer = false;
  isQuizComplete = false;

  constructor(private questionService: QuestionService) {}

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
    });

    this.timeoutId = setTimeout(() => {
      this.interval.unsubscribe();
    }, 15000);
  }

  clearTimer() {
    this.interval.unsubscribe();
    clearTimeout(this.timeoutId);
  }

  checkAnswer(form: NgForm) {
    this.clearTimer();
    this.isAnswerSubmitted = true;

    // find correct answer
    const correctAnswer = this.questionsList[
      this.currentQuestionIndex
    ].answerChoices.find((el) => el.correct);
    // check if correct answer equal to selected answer
    if (correctAnswer?.answerText === form.value.answerInput) {
      this.points += 100;
      this.isCorrectAnswer = true;
    } else {
      this.points -= 100;
      this.isCorrectAnswer = false;
    }

    if (this.currentQuestionIndex === this.questionsList.length - 1) {
      this.isQuizComplete = true;
    }
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.reset();
  }

  reset() {
    this.isAnswerSubmitted = false;
    this.isCorrectAnswer = false;
    this.counter = 15;
    this.clearTimer();
    this.startTimer();
  }

  showResults() {
    alert('test');
  }
}
