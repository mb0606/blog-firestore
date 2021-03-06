import React, { useState } from "react";
import { Card, Button, CardColumns, Modal } from "react-bootstrap";

export default function PostList(props) {
  const { posts, deletePost, displayPostInModal } = props;

  return (
    <div style={{ paddingTop: 20 }}>
      <CardColumns>
        {posts &&
          posts.map((post, index) => {
            return (
              <Card key={post.id}>
                <Card.Body onClick={() => displayPostInModal(post.id)}>
                  <Card.Title>{post.id}</Card.Title>
                  <Card.Title>{post.title.toUpperCase()}</Card.Title>
                  <Card.Text>{`${post.body.slice(0, 20)}...`}</Card.Text>
                </Card.Body>
                <Card.Footer style={{ testAlign: "right", padding: 5 }}>
                  <Button variant="danger" onClick={() => deletePost(post.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </Button>
                </Card.Footer>
              </Card>
            );
          })}
      </CardColumns>
    </div>
  );
}
