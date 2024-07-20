import { useEffect, useState } from 'react'

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

export const TwitterEmbedScript = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    loadScript('https://cdn.amomama.de/hackathon/scripts/lazy-embedo.js')
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
      src='https://platform.twitter.com/widgets.js'
      charSet='utf-8'
    ></script>
    </>
  )
}
