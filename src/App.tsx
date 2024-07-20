import { useEffect, useLayoutEffect, useState } from 'react'
import './App.css'
import { BodyScriptInjector } from './BodyScriptInjector'
import { TwitterEmbedScript } from './TwitterEmbedScript'

interface ContentJson {
  type: string
  src?: string
  content?: string
  id?: string
  url?: string
}

enum ContentType {
  Image = 'image',
  Title = 'title',
  Paragraph = 'paragraph',
  Adv = 'adv',
  Video = 'video',
  Embed = 'embed',
}

function App() {
  const [data, setData] = useState<ContentJson[] | null>(null)

  const videoContainer = document.getElementById('vidazoo')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://cdn.amomama.de/hackathon/article.json'
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setData(data.data)
      } catch (error: unknown) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  useLayoutEffect(() => {
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
  }, [])

  useLayoutEffect(() => {
    if (!videoContainer) {
      return
    }

    const vidazoo = document.createElement('script')
    vidazoo.async = true
    vidazoo.src = 'https://static.vidazoo.com/basev/vwpt.js'
    vidazoo.setAttribute('data-widget-id', '5f7c82bd819a8b00049dd9d6')

    videoContainer.appendChild(vidazoo)
  }, [videoContainer])

  return (
    <main className='main'>
      <TwitterEmbedScript />

      {data &&
        data.map((item, index) => (
          <div key={index}>
            {item.type === ContentType.Image && (
              <img loading='lazy' src={item.src} />
            )}
            {item.type === ContentType.Title && <h1>{item.content}</h1>}
            {item.type === ContentType.Paragraph && <p>{item.content}</p>}
            {item.type === ContentType.Adv && item.id && (
              <div data-slot-type={'1'} id={item.id}>
                <p>here</p>
                <BodyScriptInjector advId={item.id} />
              </div>
            )}
            {item.type === ContentType.Video && <div id={item.id}></div>}
            {item.type === ContentType.Embed && item.url && (
              <div data-frame-url={item.url} data-theme='dark'></div>
            )}
          </div>
        ))}
    </main>
  )
}

export default App
