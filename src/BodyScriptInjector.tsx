import React from 'react'
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pbjs: any
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let googletag: { pubads: () => any }

interface Props {
  advId: string
}

export const BodyScriptInjector: React.FC<Props> = (props) => {
  return (
    <script>
      {/* window.pbjs.que.push(function (){' '}
      {window.pbjs.requestBids({
          timeout: 1000,
          adUnitCodes: [`${props.advId}`],
          bidsBackHandler: function () {
            window.pbjs.setTargetingForGPTAsync([`${props.advId}`])

            const target = googletag
              .pubads()
              .getSlots()
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .find((slot: any) => slot.getSlotElementId() === `${props.advId}`)

            target && googletag.pubads().refresh([target])
          },
        })}
      ) */}
    </script>
  )
}
