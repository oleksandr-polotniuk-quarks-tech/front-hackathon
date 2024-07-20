import { Component, effect, ElementRef, input } from '@angular/core';

@Component({
  selector: 'app-embed',
  standalone: true,
  imports: [],
  templateUrl: './embed.component.html',
  styleUrl: './embed.component.scss',
})
export class EmbedComponent {

  public url = input.required<string>();

  constructor(
    private readonly _element: ElementRef,
  ) {
    effect(() => {
      const repeatUntilEmbedoLoads = setInterval(() => {
          // Check if Embedo is in the window object
          if ((window as any).Embedo) {
            clearInterval(repeatUntilEmbedoLoads);

            // Instaniate Embedo with Twitter enabled
            const embedo = new (window as any).Embedo({ twitter: true });

            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry: any) => {
                  if (entry.isIntersecting) {
                    // Load and render the embedo
                    embedo.load(entry.target, entry.target['dataset'].frameUrl);
                    embedo.render();
                    observer.unobserve(entry.target);
                  }
                });
              },
              { threshold: 1, rootMargin: `${window.innerHeight}px` },
            );

            // Observe all elements with 'data-frame-url' attribute
            observer.observe(this._element.nativeElement);
          }
        },
        100); // Repeat this check every 100ms
    });
  }

}
