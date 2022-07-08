import { useState } from "react";
import { useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { createDeck } from "../utils/api/index.js";
import Breadcrumb from "../Layout/Breadcrumb.js";

function CreateDeck({ decks, setDecks }) {
  const history = useHistory();

  const initialDeckData = { name: "", description: "" };
  const [deckData, setDeckData] = useState(initialDeckData);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    createDeck(deckData)
      .then(setDecks([...decks, deckData]))
      .then(setDeckData({ ...initialDeckData }))
      .then(history.push(`/`))
      .catch(console.error);
  };

  if (Object.keys(deckData).length > 0) {
    return (
      <div>
        <Breadcrumb currentPage="Create Deck" />
        <h1>Create Deck</h1>
        <DeckForm
          onSubmitHandler={onSubmitHandler}
          onCancel={() => history.push(`/`)}
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
export default CreateDeck;
