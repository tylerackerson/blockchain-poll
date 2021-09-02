import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false;

  polls = [{
    question: 'Cats or dogs?',
    image: 'https://images.pexels.com/photos/5745284/pexels-photo-5745284.jpeg',
    votes: [1, 3, 4],
    voted: true
  },
  {
    question: 'Winter or summer?',
    image: 'https://images.pexels.com/photos/7243200/pexels-photo-7243200.jpeg',
    votes: [1],
    voted: false
  }]
}
