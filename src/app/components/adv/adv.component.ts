import { Component, input } from '@angular/core';

export interface IPDJSJAPI {
  que: any[];
  requestBids: (obj: any) => void;
  setTargetingForGPTAsync: (obj: any) => void;
}

declare global {
  interface Window {
    pbjs: IPDJSJAPI;
  }
}

declare let googletag: { pubads: () => any };

@Component({
  selector: 'app-adv',
  standalone: true,
  imports: [],
  templateUrl: './adv.component.html',
  styleUrl: './adv.component.scss',
})
export class AdvComponent {

  public id = input.required<string>();

  constructor() {
  }

  public fetchAdv(): void {
    window.pbjs.que.push(() => {
      window.pbjs.requestBids({
        timeout: 1000,
        adUnitCodes: [this.id()],
        bidsBackHandler: () => {
          window.pbjs.setTargetingForGPTAsync([this.id()]);
          const target = googletag
            .pubads()
            .getSlots()
            .find((slot: any) => slot.getSlotElementId() === this.id());
          target && googletag.pubads().refresh([target]);
        },
      });
    });
  }

}
