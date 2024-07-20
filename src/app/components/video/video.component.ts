import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
})
export class VideoComponent {

  public id = input.required<string>();

  constructor() {
    effect(() => {
      const vidazoo = document.createElement('script');
      vidazoo.async = true;
      vidazoo.src = 'https://static.vidazoo.com/basev/vwpt.js';
      vidazoo.setAttribute('data-widget-id', '5f7c82bd819a8b00049dd9d6');
      document.getElementById(this.id())?.appendChild(vidazoo);
    });
  }

}
