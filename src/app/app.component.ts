import { AsyncPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { BlockContent, ContentModel, EmbedContent, ImageContent, TextContent } from './models/content.model';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { ContentService } from './services/content.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe, NgOptimizedImage, SanitizePipe],
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

  public getSrc(item: ContentModel): string {
    return (item as ImageContent).src;
  }

  public getContent(item: ContentModel): string {
    return (item as TextContent).content;
  }

  public getId(item: ContentModel): string {
    return (item as BlockContent).id;
  }


  public getUrl(item: ContentModel): string {
    return (item as EmbedContent).url;
  }

}
