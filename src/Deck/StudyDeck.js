import { useParams, useHistory } from "react-router-dom";
import Card from "./Cards/Card.js";
import { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index.js";

import Breadcrumb from "../Layout/Breadcrumb.js";

function StudyDeck() {
  const [studyDeck, setStudyDeck] = useState({});
  const [studyCards, setStudyCards] = useState(null);
  const [front, setFront] = useState(true);
  const [currentCardId, setCurrentCardId] = useState(0);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId)
      .then((response) => {
        setStudyDeck(response);
        setStudyCards(response.cards);
      })
      .catch(console.error);
  }, [deckId]);

  const handleRestart = () => {
    if (
      window.confirm(
        "Restart cards?\n\nClick 'Cancel' to return to the home page."
      )
    ) {
      setCurrentCardId(0);
    } else {
      history.push(`/`);
    }
  };

  const handleBack = () => {
    setCurrentCardId(currentCardId - 1);
    setFront(true);
  };

  const handleNext = () => {
    setCurrentCardId(currentCardId + 1);
    setFront(true);
  };

  if (studyDeck.id && studyCards) {
    if (studyCards.length < 3) {
      return (
        <>
          <Breadcrumb
            subLink={`/decks/${deckId}/study`}
            subLinkName={`Deck ${studyDeck.name}`}
            currentPage="Study"
          />
          <h2>
            Study: <span>{studyDeck.name}</span>
          </h2>
          <h3>Not enough cards.</h3>
          <p>
            You need at least 3 cards to study. There are {studyCards.length}{" "}
            {studyCards.length === 1 ? "card" : "cards"} in this deck.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => history.push(`/decks/${deckId}/cards/new`)}
          >
            <i className="bi-plus icon"></i>Add Cards
          </button>
        </>
      );
    }
    return (
      <>
        <Breadcrumb
          subLink={`/decks/${deckId}/study`}
          subLinkName={`Deck ${studyDeck.name}`}
          currentPage="Study"
        />
        <h2>{studyDeck.name}</h2>

        <div className="card card-box">
          <div className="card-body">
            <div className="d-flex flex-column">
              <h4>
                Card {currentCardId + 1} of {studyCards.length}
              </h4>
              <Card card={studyCards[currentCardId]} front={front} />
              <div className="d-flex flex-row">
                {currentCardId > 0 && (
                  <button
                    className="btn btn-secondary mr-3"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                )}
                <button
                  className="btn btn-info mr-3"
                  onClick={() => setFront(!front)}
                >
                  Flip
                </button>

                {currentCardId < studyCards.length - 1 && !front && (
                  <button className="btn btn-success" onClick={handleNext}>
                    Next
                  </button>
                )}
                {currentCardId === studyCards.length - 1 && (
                  <button className="btn btn-warning" onClick={handleRestart}>
                    Restart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return "Loading...";
}

export default StudyDeck;
