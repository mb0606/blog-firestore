import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { firestore } from "./firebase/firebase.util";

export default function PostForm(props) {
  const { addPostToList, setLoading } = props;
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const postRef = firestore.collection("posts");
      const data = await postRef.add({ title, body });
      addPostToList({
        id: data.id,
        title,
        body,
      });
    } catch (error) {
      throw error.message;
    }

    setTitle("");
    setBody("");
    setChecked(false);
    setLoading(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Check
        type="checkbox"
        label="Add Post"
        checked={checked}
        onChange={() => setChecked((prevState) => !prevState)}
      />
      {checked && (
        <>
          <Form.Group>
            <Form.Control
              type="input"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Post Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </>
      )}
      <hr></hr>
    </Form>
  );
}
