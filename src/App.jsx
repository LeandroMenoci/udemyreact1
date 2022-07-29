
import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [posts, setPosts] = useState([])
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(post => setPosts(post))
  }, [])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(res => res.json())
      .then(photo => setPhotos(photo))
  }, [])

  const postsAndPhotos = posts.map((post, index) => {
    return { ...post, cover: photos[index].url }
  })

  return (
    <section className='container'>
      <div className='posts'>
        {postsAndPhotos.map(post => (
          <div className="post">
            <img src={post.cover} alt={post.title} />
            <div key={post.id} className='post-content'>
              <h1 >{post.title}</h1>
              <p>{post.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
