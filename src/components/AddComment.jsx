import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = (props) => {
  // state = {
  //   commentObj: {
  //     comment: "",
  //     rate: "1",
  //     elementId: this.props.asin,
  //   },
  // };

  const [commentObj, setCommentObj] = useState({ comment: "", rate: "1", elementId: props.asin });

  const sendComment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        body: JSON.stringify(commentObj),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY5YzllMzhkM2Q0OTAwMTRjZmQ3ZjgiLCJpYXQiOjE2OTQ0MzY0ODksImV4cCI6MTY5NTY0NjA4OX0.ubH9GR6FLH6y4d2HXPSBC07i7DmrwFfHQ1UUXRVgdxg",
        },
      });
      if (response.ok) {
        // alert("Commento inviato");

        // ricrea la lista di commenti nel livello superiore (il padre: CommentArea)
        // attraverso la referenza della funzione fetchComments passata come prop a questo componente
        props.fetchComments();

        // resetta i campi (svuotarli)
        setCommentObj({
          comment: "",
          rate: "1",
          elementId: props.asin,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form onSubmit={sendComment}>
      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>Commento</Form.Label>
        <Form.Control
          type="text"
          placeholder="Inserisci il commento"
          value={commentObj.comment}
          onChange={(e) => setCommentObj({ ...commentObj, comment: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>Voto</Form.Label>
        <Form.Select
          value={commentObj.rate}
          onChange={(e) => {
            setCommentObj({
              ...commentObj,
              rate: e.target.value,
            });
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" variant="primary">
        Invia commento
      </Button>
    </Form>
  );
};

export default AddComment;
