import React, {useEffect, useState} from "react";
import {Container, Row, Col, Spinner} from 'react-bootstrap';
import PostForm from "./PostForm";
import PostList from "./PostList";
import PostModal from "./PostModal";

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [show, setShow] =  useState(false)
  const [postId, setPostId] = useState("")
  
  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => {
    setPosts(json)
    setLoading(false)})
  },[setLoading, setPosts])

  function addPostToList(newPost){
    setPosts([newPost, ...posts])
} 
  function deletePost(postId){
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
} 
  function displayPostInModal(postId){
    setPostId(postId)
    setShow(true)
  }
  function closePostModal() {
    setShow(false)
  }

  if(loading){
    return <Spinner animation="border" />
  }

  return (
    <Container>
        <Row className="justify-content-center" style={{marginTop: 60}}>
          <Col xs lg="12">
            <h1 style={{textAlign: 'center'}}>Blog App</h1>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{marginTop: 20}}>
          <Col xs lg="12">
            <PostForm addPostToList={addPostToList}/>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{marginTop: 20}}>
          <Col xs lg="12">
            <PostList posts={posts} deletePost={deletePost} displayPostInModal={displayPostInModal} />
          </Col>
        </Row>
        <PostModal show={show} closePostModal={closePostModal} postId={postId}/>
    </Container>
  );
}

export default App;
