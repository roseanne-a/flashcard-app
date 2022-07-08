import { useState, useEffect } from "react";
import { updateCard, readCard } from "../../utils/api/index.js";
import { useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import Breadcrumb from "../../Layout/Breadcrumb.js";

function EditCard({ deck, cards, setCards }) {
  const initialCardData = { front: "", back: "" };
  const history = useHistory();
  const { cardId, deckId } = useParams();
  const [cardData, setCardData] = useState({});

  useEffect(() => {
    readCard(cardId).then(setCardData).catch(console.error);
  }, [cardId]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    updateCard(cardData)
      .then(
        setCards([...cards.filter((card) => card.id !== cardData.id), cardData])
      )
      .then(setCardData({ ...initialCardData }))
      .then(history.push(`/decks/${deckId}/`))
      .catch(console.error);
  };

  if (cardData.id) {
    return (
      <div>
        <Breadcrumb
          subLink={`/decks/${deckId}`}
          subLinkName={`Deck ${deck.name}`}
          currentPage={`Edit Card ${cardId}`}
        />
        <h1>{deck.name}: Edit Card</h1>
        <CardForm
          onSubmitHandler={onSubmitHandler}
          onCancel={() => history.push(`/decks/${deckId}`)}
          submitLabel="Submit"
          cancelLabel="Cancel"
          cardData={cardData}
          setCardData={setCardData}
        />
      </div>
    );
  }
  return <p>Loading...</p>;
}

export default EditCard;
