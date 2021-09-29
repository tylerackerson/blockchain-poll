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

  async getPolls(): Promise<Poll[]> {
    const polls: Poll[] = [];

    const totalPollCount = await this.web3.call('getPollCount');
    const acc = await this.web3.getAccount();
    const voter = await this.web3.call('getVoter', acc);

    for (let i = 0; i < totalPollCount; i++) {
      const poll = await this.web3.call('getPoll', i);
      polls.push(poll);
    }

    return polls;
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
