import { useEffect, useState } from "react"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Embedo: any
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.body.appendChild(script)
  })
}

export const HeadScriptInjector = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    loadScript('https://unpkg.com/embedo/embedo.min.js')
      .then(() => {
        console.log('Script loaded')

        if (window.Embedo) {
          setScriptLoaded(true)
        } else {
          console.error('Script loaded but pbjs is not defined')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('firstVisit') === 'true') {
      alert('RELOAD!')
      sessionStorage.removeItem('firstVisit')
    }

    sessionStorage.setItem('firstVisit', 'true')

    const scrollDelay = 350
    const scrollDistance = 15
    setInterval(() => {
      window.scroll({
        top: window.scrollY + scrollDistance,
        left: 0,
        behavior: 'smooth',
      })
    }, scrollDelay)

    const waitEmbedo = setInterval(() => {
      if (window.Embedo) {
        clearInterval(waitEmbedo)

        const embedo = new Embedo({ twitter: true })

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                embedo.load(entry.target, entry.target.dataset.frameUrl)
                embedo.render()
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 1, rootMargin: `${window.innerHeight}px` }
        )

        document.querySelectorAll('[data-frame-url]').forEach((element) => {
          observer.observe(element)
        })
      }
    })
  }, [scriptLoaded])

  return (
    <>
      <script
        async
        type='text/javascript'
        src='https://static.kueezrtb.com/js/latest_cls.js?_=1721468949223'
      ></script>
      <script
        is='quantcast'
        src='https://cdn.amomama.de/hackathon/scripts/quantcast.min.js'
      ></script>
      <script
        async
        data-cfasync='false'
        crossOrigin='anonymous'
        src='https://static.kueezrtb.com/latest.js'
        id='kueezrtb_latest'
      ></script>
      <script async src='https://www.googletagservices.com/tag/js/gpt.js'></script>
      <script
        async
        src='https://cdn.amoanimals.com/prebiders/65df2430c6119531530487.js'
      ></script>
    </>
  )
}
