import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { firestore } from "./firebase/firebase.util";

export default function PostModal(props) {
  const { postId, show, closePostModal } = props;
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function getPost() {
      try {
        const postRef = firestore.collection("posts");
        const postDoc = await postRef.doc(postId).get();
        setPost(postDoc.data());
      } catch (error) {
        throw error.message;
      }
    }
    getPost();
  }, [postId, setPost]);

  if (!post) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <Modal show={show} onHide={closePostModal}>
        <Modal.Header closeButton>
          <Modal.Title>{post?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{post?.body}</Modal.Body>
      </Modal>
    </div>
  );
}
