import { useEffect, useState } from "react";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api/index.js";
import Card from "./Cards/Card.js";
import Deck from "./Deck.js";
import EditDeck from "./EditDeck";
import StudyDeck from "./StudyDeck.js";
import CreateCard from "./Cards/CreateCard";
import EditCard from "./Cards/EditCard.js";
import Breadcrumb from "../Layout/Breadcrumb.js";

function ViewDeck({ handleDeckDelete, decks, setDecks }) {
  const [currentDeck, setCurrentDeck] = useState({});
  const [currentCards, setCurrentCards] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getDeckAndCards() {
      const deckAndCards = await readDeck(deckId);
      setCurrentDeck(deckAndCards);
      setCurrentCards(deckAndCards.cards);
    }
    getDeckAndCards();
  }, [deckId]);

  const handleCardDelete = (card) => {
    if (window.confirm("Are you sure you want to delete that card?")) {
      deleteCard(card.id).then(setCurrentCards).catch(console.error);

      window.alert("The card has been deleted.");
      history.go(0);
    }
  };

  if (currentDeck.id) {
    return (
      <>
        <Switch>
          <Route path="/decks/:deckId/edit">
            <EditDeck
              setDeck={setCurrentDeck}
              decks={decks}
              setDecks={setDecks}
            />
          </Route>

          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CreateCard cards={currentCards} setCards={setCurrentCards} />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard
              deck={currentDeck}
              cards={currentCards}
              setCards={setCurrentCards}
            />
          </Route>
          <Route path="/decks/:deckId">
            <Breadcrumb currentPage={currentDeck.name} />
            <Deck
              deck={currentDeck}
              handleDeckDelete={() => handleDeckDelete(currentDeck)}
            />
            <div className="pt-3">
              <h2>Cards</h2>
            </div>
            {currentCards.length > 0 ? (
              currentCards.map((card, index) => (
                <Card
                  card={card}
                  key={index}
                  handleCardDelete={() => handleCardDelete(card)}
                />
              ))
            ) : (
              <p>
                There are currently no cards in this deck. Please click above to
                add one.
              </p>
            )}
          </Route>
        </Switch>
      </>
    );
  }
  return <p>Loading...</p>;
}
export default ViewDeck;
