import { AsyncPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AdvComponent } from './components/adv/adv.component';
import { EmbedComponent } from './components/embed/embed.component';
import { VideoComponent } from './components/video/video.component';
import { BlockContent, ContentModel, EmbedContent, ImageContent, TextContent } from './models/content.model';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { ContentService } from './services/content.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe, NgOptimizedImage, SanitizePipe, AdvComponent, VideoComponent, EmbedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

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
