
import { Component } from 'react';
import { Button } from '../../components/Button';
import { Posts } from '../../components/Posts';
import { TextInput } from '../../components/TextInput';
import { loadPosts } from '../../utils/load-posts';
import './styles.css';


export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 6,
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts()
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state

    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state

    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
      })
      : posts

    return (
      <section className='container' >
        <div className='search-container'>
          {!!searchValue && (
            <h2>Search value: {searchValue}</h2>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
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
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}

        </div>
      </section>
    );
  }
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