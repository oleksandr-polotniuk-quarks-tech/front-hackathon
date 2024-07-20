import { AsyncPipe, DOCUMENT, JsonPipe, NgOptimizedImage } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { debounceTime, Observable, of, Subject, switchMap } from 'rxjs';
import { AdvComponent } from './components/adv/adv.component';
import { EmbedComponent } from './components/embed/embed.component';
import { VideoComponent } from './components/video/video.component';
import { BlockContent, ContentModel, EmbedContent, ImageContent, TextContent } from './models/content.model';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { ContentService } from './services/content.service';

export declare let googletag: { pubads: () => any; destroySlots: (slots: any) => void };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe, NgOptimizedImage, SanitizePipe, AdvComponent, VideoComponent, EmbedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewChecked {

  public contentList$: Observable<ContentModel[]>;

  @ViewChildren(AdvComponent)
  private _advList?: QueryList<AdvComponent>;

  private _advInitObserver = new Subject<void>();

  constructor(
    @Inject(DOCUMENT)
    private readonly _document: Document,
    private readonly _contentService: ContentService,
    private readonly _renderer2: Renderer2,
    private readonly _cdr: ChangeDetectorRef,
  ) {
    this.contentList$ = this._contentService.getContentList();
    this._advInitObserver
      .pipe(
        debounceTime(500),
        switchMap(() => {
          const oldScript = this._document.getElementById('adv');
          if (oldScript) {
            this._renderer2.removeChild(oldScript.parentNode, oldScript);
            googletag.destroySlots(googletag.pubads().getSlots());
            this._cdr.detectChanges();
          }
          return of(void 0);
        }),
        switchMap(() => {
          const script = this._renderer2.createElement('script') as HTMLScriptElement;
          script.id = 'adv';
          script.type = 'text/javascript';
          script.src = 'adv.min.js';
          this._renderer2.appendChild(this._document.body, script);
          script.onload = () => this._advList?.forEach((adv) => adv.fetchAdv());
          return of(void 0);
        }),
      )
      .subscribe(() => {
      });
  }

  public ngAfterViewChecked(): void {
    // this._viewCheckedCount++;
    // if (this._viewCheckedCount !== 2) {
    //   return;
    // }
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

  public onAdvViewInit(): void {
    this._advInitObserver.next();
  }

}
