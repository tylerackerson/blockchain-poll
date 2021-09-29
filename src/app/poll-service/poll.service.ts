import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Web3Service } from '../blockchain/web3.service';
import { Poll, PollForm, PollVote } from '../types';
import { fromAscii } from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  constructor(private web3: Web3Service) {}

  async getPolls() {
    const totalPolls = await this.web3.call("getPollCount");
    console.log(totalPolls);

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
    this.web3.executeTransaction("vote", vote.id, vote.vote);
  }

  createPoll(poll: PollForm) {
    this.web3.executeTransaction(
      "createPoll",
      poll.question,
      poll.image || "",
      poll.options.map(fromAscii)
    );
  }
}
