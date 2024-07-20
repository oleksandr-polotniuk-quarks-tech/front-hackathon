import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentModel } from './models/content.model';
import { ContentService } from './services/content.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hackathon';

  public contentList$: Observable<ContentModel[]>;

  constructor(
    private readonly _contentService: ContentService,
  ) {
    this.contentList$ = this._contentService.getContentList();
  }
}
