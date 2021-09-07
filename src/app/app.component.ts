import { Component } from '@angular/core';
import { Poll } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false;
  activePoll: Poll = null;

  polls: Poll[] = [{
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
  }];

  setActivePoll(poll: Poll) {
    this.activePoll = null;

    setTimeout(() => {
      this.activePoll = poll;
    }, 100)
  }
}
