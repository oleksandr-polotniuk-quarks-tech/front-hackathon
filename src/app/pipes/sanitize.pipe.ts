import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

export type SanitizeType = 'html' | 'style' | 'script' | 'url' | 'resourceUrl'

@Pipe({
  name: 'sanitize',
  standalone: true,
})
export class SanitizePipe<T> implements PipeTransform {

  constructor(
    private readonly _sanitizer: DomSanitizer,
  ) {
  }

  public transform(value: T, type: SanitizeType): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this._sanitizer.bypassSecurityTrustHtml(value as string);
      case 'style':
        return this._sanitizer.bypassSecurityTrustStyle(value as string);
      case 'script':
        return this._sanitizer.bypassSecurityTrustScript(value as string);
      case 'url':
        return this._sanitizer.bypassSecurityTrustUrl(value as string);
      case 'resourceUrl':
        return this._sanitizer.bypassSecurityTrustResourceUrl(value as string);
      default:
        throw new Error(`Invalid safe type specified`);
    }
  }

}
