
import React from 'react';
import './styles.css'
import { Button } from '../../components/Button';
import { Posts } from '../../components/Posts';
import { TextInput } from '../../components/TextInput';
import { loadPosts } from '../../utils/load-posts';
import { useEffect, useState, useCallback } from 'react'

export const Home = () => {
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(6)
  const [searchValue, setSearchValue] = useState('')

  const noMorePosts = page + postsPerPage >= allPosts.length
  const filteredPosts = searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
    })
    : posts



  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts()

    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  })

  useEffect(() => {
    handleLoadPosts(page, postsPerPage)
  }, [])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    setPosts(posts)
    setPage(nextPage)
  }

  const handleChange = (e) => {
    const { value } = e.target
    setSearchValue(value)
  }

  return (
    <section className='container' >
      <div className='search-container'>
        {!!searchValue && (
          <h2>Search value: {searchValue}</h2>
        )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p>Não existem posts</p>
      )}
      <div className='button-container'>
        {!searchValue && (
          <Button
            text='Load More Posts'
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}

      </div>
    </section>
  )
}



// useEffect(() => {
//   fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res => res.json())
//     .then(post => setPosts(post))
// }, [])

// useEffect(() => {
//   fetch('https://jsonplaceholder.typicode.com/photos')
//     .then(res => res.json())
//     .then(photo => setPhotos(photo))
// }, [])

// const postsAndPhotos = posts.map((post, index) => {
//   return { ...post, cover: photos[index].url }
// })
