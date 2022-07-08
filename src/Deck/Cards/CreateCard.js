import { useState, useEffect } from "react";
import { createCard, readDeck } from "../../utils/api/index.js";
import { useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import Breadcrumb from "../../Layout/Breadcrumb.js";

function CreateCard({ cards, setCards }) {
  const history = useHistory();
  const { deckId } = useParams();
  const [deckData, setDeckData] = useState({});

  useEffect(() => {
    readDeck(deckId).then(setDeckData).catch(console.error);
  }, [deckId]);

  const initialCardData = { front: "", back: "" };
  const [cardData, setCardData] = useState(initialCardData);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    createCard(deckId, cardData)
      .then(setCards([...cards, cardData]))
      .then(setCardData({ ...initialCardData }))
      .then(history.push(`/decks/${deckId}/cards/new`))
      .catch(console.error);
  };

  if (Object.keys(deckData).length > 0) {
    return (
      <div>
        <Breadcrumb currentPage="Create Card" />
        <h1>
          <span>{deckData.name}</span>: <span>Add Card</span>
        </h1>
        <CardForm
          onSubmitHandler={onSubmitHandler}
          onCancel={() => history.push(`/decks/${deckId}`)}
          submitLabel="Save"
          cancelLabel="Done"
          cardData={cardData}
          setCardData={setCardData}
        />
      </div>
    );
  }
  return <p>Loading...</p>;
}

export default CreateCard;
