import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api/index.js";

import DeckForm from "./DeckForm";
import Breadcrumb from "../Layout/Breadcrumb.js";

function EditDeck({ setDeck, decks, setDecks }) {
  const initialDeckData = { name: "", description: "" };
  const history = useHistory();
  const { deckId } = useParams();
  const [deckData, setDeckData] = useState(initialDeckData);

  useEffect(() => {
    readDeck(deckId).then(setDeckData).catch(console.error);
  }, [deckId]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    updateDeck(deckData)
      .then(setDeck(deckData))
      .then(
        setDecks([...decks.filter((deck) => deck.id !== deckData.id), deckData])
      )
      .then(setDeckData({ ...initialDeckData }))
      .then(history.push(`/decks/${deckId}/`))
      .catch(console.error);
  };

  if (Object.keys(deckData).length > 0) {
    return (
      <div>
        <Breadcrumb
          subLink={`/decks/${deckId}/`}
          subLinkName={deckData.name}
          currentPage="Edit Deck"
        />
        <h1>Edit Deck</h1>
        <DeckForm
          onSubmitHandler={onSubmitHandler}
          onCancel={() => history.push(`/decks/${deckId}/`)}
          submitLabel="Save"
          cancelLabel="Done"
          deckData={deckData}
          setDeckData={setDeckData}
        />
      </div>
    );
  }
  return <p>Loading...</p>;
}

export default EditDeck;
