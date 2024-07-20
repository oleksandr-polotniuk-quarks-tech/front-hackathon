import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { ContentModel } from '../models/content.model';

@Injectable({
  providedIn: 'root',
})
export class ContentService {

  private _contentList$ = new BehaviorSubject<ContentModel[] | null>(null);

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  public getContentList(): Observable<ContentModel[]> {
    return this._contentList$.asObservable()
      .pipe(
        switchMap((val) => (val ? of(val) : this.fetchContentList())),
        filter((val): val is ContentModel[] => !!val),
      );
  }

  public fetchContentList(): Observable<ContentModel[]> {
    return this._http.get<{ data: ContentModel[] }>('https://cdn.amomama.de/hackathon/article.json')
      .pipe(
        map(({ data }) => data),
        tap((val) => this._contentList$.next(val)),
      );
  }

}
