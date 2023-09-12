import { Component, useEffect, useState } from "react";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  // };

  const [comments, setComments] = useState([]);

  // componentDidMount ora avverrà al primo montaggio del componente, cioè dopo la prima selezione di una card nella lista
  // componentDidMount() {
  //   console.log("didMount()");

  //   this.fetchComments();
  // }

  // fetchComments viene chiamato in: componentDidMount, componentDidUpdate e anche dopo la post interna ad AddComment
  const fetchComments = async () => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/books/" + props.asin + "/comments/", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY5YzllMzhkM2Q0OTAwMTRjZmQ3ZjgiLCJpYXQiOjE2OTQ0MzY0ODksImV4cCI6MTY5NTY0NjA4OX0.ubH9GR6FLH6y4d2HXPSBC07i7DmrwFfHQ1UUXRVgdxg",
        },
      });

      if (response.ok) {
        const commentsArr = await response.json();
        console.log("data retrieved, setState imminent....");
        // setState  accetta una callback come secondo parametro opzionale, che verrà chiamata dopo che lo stato è stato effettivamente aggiornato
        setComments(commentsArr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("didUpdate()");

  // controllo di guardia per rifare la fetch SOLO SE cambia la prop, non quando c'è un aggiornamento di stato
  // if (prevProps.asin !== this.props.asin) {
  // in questo modo la lista dei commenti cambierà nel momento in cui selezioneremo un altra card, perché l'asin sarà cambiato dopo la nuova selezione
  //     this.fetchComments();
  //   } else {
  //     console.log("componentDidUpdate but NO FETCH!");
  //   }
  // }

  useEffect(() => {
    fetchComments();
    return () => console.log("Componente smontato");
  }, [props.asin]);

  // componentWillUnmount() {
  //   console.log("willUnmount()");
  // }

  return (
    <div>
      {/* la prop fetchComments dà la possibilità ad AddComment di rifare la fetch e ottenere la lista di commenti aggiornati 
         che servirà poi a CommentList qua sotto per ricevere la nuova lista aggiornata, con anche l'ultimo appena inserito */}
      <AddComment asin={props.asin} fetchComments={fetchComments} />
      <CommentsList comments={comments} />
    </div>
  );
};

export default CommentArea;
