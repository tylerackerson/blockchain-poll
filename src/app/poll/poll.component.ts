import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  @Input() question: string;
  @Input() image: string;
  @Input() results: number[];
  @Input() voted: boolean;

  numberOfVotes: number;

  constructor() {}

  ngOnInit(): void {
    this.numberOfVotes = this.results.reduce((acc, curr) => acc += curr, 0);
  }

}
