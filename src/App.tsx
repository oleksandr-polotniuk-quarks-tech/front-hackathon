import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [content, setContent] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);

    useEffect(() => {
        const loadContent = async () => {
            const res = await fetch('https://cdn.amomama.de/hackathon/article.json');

            const preparedContent = await res.json();

            const data = preparedContent?.data;
            setContent(data);

            const images = data.filter(tag => tag.type === 'image');

            setImages(images);
        }

        if (count === 0) {
            loadContent();
        }
    }, []);

  const increaseCounter = () => {
      setCount(prev => {
          // console.log(prev, images[prev]);

          if (images[prev]?.src) {
              return prev + 1;
          }

          return prev;
      });
  }


  useEffect(() => {
    setImageUrl(images[count]?.src);
  }, [count]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={increaseCounter}>
          count is {count}
        </button>

          {imageUrl && (
              <img src={imageUrl} alt="Test image" className="image" />
          )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
