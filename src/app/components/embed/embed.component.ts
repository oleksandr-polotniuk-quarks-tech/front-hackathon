import { Component, ElementRef, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-embed',
  standalone: true,
  imports: [],
  templateUrl: './embed.component.html',
  styleUrl: './embed.component.scss',
})
export class EmbedComponent implements OnInit {

  public url = input.required<string>();

  constructor(
    private readonly _element: ElementRef,
  ) {
  }

  public ngOnInit(): void {
    const id = this.url().split('/').at(-1);
    (window as any).twttr.widgets.createTweet(
      String(id),
      this._element.nativeElement,
    );
  }

}
