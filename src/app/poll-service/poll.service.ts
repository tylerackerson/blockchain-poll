import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Poll, PollForm, PollVote } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor() {}

  getPolls(): Observable<Poll[]> {
    return of([{
      id: 1,
      question: 'Cats or dogs?',
      image: 'https://images.pexels.com/photos/5745284/pexels-photo-5745284.jpeg',
      options: ['cats', 'dogs'],
      results: [1, 99],
      voted: false,
    },
    {
      id: 2,
      question: 'Winter or summer?',
      image: 'https://images.pexels.com/photos/7243200/pexels-photo-7243200.jpeg',
      options: ['winter', 'summer'],
      results: [1, 101],
      voted: true,
    }]).pipe(delay(2000))
  }

  vote(vote: PollVote) {
    console.log(vote);
  }

  createPoll(poll: PollForm) {
    console.log(poll);
  }
}
