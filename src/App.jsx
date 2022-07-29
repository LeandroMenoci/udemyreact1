
import { useEffect, useState } from 'react';
import './App.css';
import PostCard from './components/PostCard';

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
          <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            id={post.id}
            cover={post.cover}
          />
        ))}
      </div>
    </section>
  );
}
