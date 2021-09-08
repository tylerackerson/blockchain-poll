import { EventEmitter } from '@angular/core';
import { Component, Input, AfterViewInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ApexCharts from 'apexcharts';
import { PollVote } from '../types';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss']
})

export class PollVoteComponent implements AfterViewInit {

  @Input() id: number;
  @Input() voted: boolean;
  @Input() question: string;
  @Input() options: string[];
  @Input() results: number[];
  @Input() title: string;

  @Output() pollVoted: EventEmitter<PollVote> = new EventEmitter();

  voteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.voteForm = this.fb.group({
      selected: this.fb.control('', [Validators.required])
    })
  }

  ngAfterViewInit(): void {
    if (this.voted) {
      this.generateChart();
    }
  }

  submitVote() {
    const pollVote: PollVote = {
      id: this.id,
      vote: this.voteForm.get("selected").value
    }

    this.pollVoted.emit(pollVote);
  }

  generateChart() {
    const options: ApexCharts.ApexOptions = {
      series: [
        {
          data: this.results,
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: this.options,
      },
    };

    const chart = new ApexCharts(document.getElementById('poll-results'), options);
    chart.render();
  }
}
