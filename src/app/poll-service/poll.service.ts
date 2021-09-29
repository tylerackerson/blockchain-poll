import { Injectable } from '@angular/core';
import { Web3Service } from '../blockchain/web3.service';
import { Poll, PollForm, PollVote, Voter } from '../types';
import { fromAscii, toAscii } from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  constructor(private web3: Web3Service) {}

  async getPolls(): Promise<Poll[]> {
    const polls: Poll[] = [];

    const totalPollCount = await this.web3.call('getPollCount');
    const acc = await this.web3.getAccount();
    const voter = await this.getVoterForAccount(acc);

    for (let i = 0; i < totalPollCount; i++) {
      const poll = await this.getPoll(i, voter);
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

  private async getVoterForAccount(acc: string): Promise<Voter> {
    const voter = await this.web3.call('getVoter', acc);
    return this.normalizeVoter(voter);
  }

  private normalizeVoter(voterData: object): Voter {
    return {
      id: voterData[0],
      voted: voterData[1].map(parseInt)
    }
  }

  private async getPoll(id: number, voter: Voter): Promise<Poll> {
    const poll = await this.web3.call('getPoll', id);
    return this.normalizePoll(poll, voter);
  }

  private normalizePoll(pollData: object, voter: Voter): Poll {
    return {
      id: pollData[0],
      question: pollData[1],
      image: pollData[2],
      results: pollData[3].map(parseInt),
      options: pollData[4].map(toAscii),
      voted: voter.voted.length && voter.voted.find((votedId) => votedId === parseInt(pollData[0])) != undefined
    }
  }
}
