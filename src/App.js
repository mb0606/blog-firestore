import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { firestore } from "./firebase/firebase.util.js";
import PostForm from "./PostForm";
import PostList from "./PostList";
import PostModal from "./PostModal";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [postId, setPostId] = useState("");

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const postsRef = firestore.collection("posts");
        const postsDoc = await postsRef.get();
        const data = postsDoc.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setPosts(data);
        // const postsDoc = await postsRef.get();
        // console.log("post exists", postsDoc.exists);
        // if (!postsDoc.exists) {
        //   setPosts([]);
        // } else {
        //   console.log(postsDoc.data());
        //   setPosts(postsDoc.data());
        // }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();

    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     setPosts(json);
    //     setLoading(false);
    //   });
  }, [setLoading, setPosts]);

  function addPostToList(newPost) {
    setPosts([newPost, ...posts]);
  }
  async function deletePost(postId) {
    try {
      const postRef = firestore.doc(`posts/${postId}`);
      await postRef.delete();
    } catch (error) {
      throw error.message;
    }
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  }
  function displayPostInModal(postId) {
    setPostId(postId);
    setShow(true);
  }
  function closePostModal() {
    setShow(false);
  }

  if (loading || (posts.length === 0 && posts)) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <Row className="justify-content-center" style={{ marginTop: 60 }}>
        <Col xs lg="12">
          <h1 style={{ textAlign: "center" }}>Blog App</h1>
        </Col>
      </Row>
      <Row className="justify-content-center" style={{ marginTop: 20 }}>
        <Col xs lg="12">
          <PostForm addPostToList={addPostToList} setLoading={setLoading} />
        </Col>
      </Row>
      <Row className="justify-content-center" style={{ marginTop: 20 }}>
        <Col xs lg="12">
          <PostList
            posts={posts}
            deletePost={deletePost}
            displayPostInModal={displayPostInModal}
          />
        </Col>
      </Row>
      <PostModal show={show} closePostModal={closePostModal} postId={postId} />
    </Container>
  );
}

export default App;
