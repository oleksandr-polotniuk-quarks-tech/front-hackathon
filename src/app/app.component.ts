import { AsyncPipe, DOCUMENT, JsonPipe, NgOptimizedImage } from '@angular/common';
import { AfterViewChecked, Component, Inject, QueryList, Renderer2, ViewChildren } from '@angular/core';
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
export class AppComponent implements AfterViewChecked {

  @ViewChildren(AdvComponent)
  public advs?: QueryList<AdvComponent>;

  public contentList$: Observable<ContentModel[]>;

  private _viewCheckedCount = 0;

  constructor(
    private readonly _contentService: ContentService,
    private readonly _renderer2: Renderer2,
    @Inject(DOCUMENT)
    private readonly _document: Document,
  ) {
    this.contentList$ = this._contentService.getContentList();
  }

  public ngAfterViewChecked(): void {
    this._viewCheckedCount++;
    if (this._viewCheckedCount !== 2) {
      return;
    }
    const script = this._renderer2.createElement('script') as HTMLScriptElement;
    script.id = 'adv';
    script.type = 'text/javascript';
    script.src = 'https://cdn.amomama.de/hackathon/scripts/adv.min.js';
    this._renderer2.appendChild(this._document.body, script);
    script.onload = () => this.advs?.forEach((adv) => adv.fetchAdv());
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
