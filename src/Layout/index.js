import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Switch, useHistory } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import NotFound from "./NotFound";

import { listDecks, deleteDeck } from "../utils/api/index.js";

import CreateDeck from "../Deck/CreateDeck.js";
import Deck from "../Deck/Deck.js";
import ViewDeck from "../Deck/ViewDeck.js";

import "./Index.css";

function Layout() {
  const [allDecks, setAllDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setAllDecks).catch(console.error);

    return () => abortController.abort();
  }, []);

  const handleDeckDelete = (deckToDelete) => {
    if (
      window.confirm(
        "Are you sure you want to delete that deck?\n\nYou will not be able to recover it."
      )
    ) {
      deleteDeck(deckToDelete.id)
        .then(
          setAllDecks((allDecks) =>
            allDecks.filter((deck) => deck.id !== deckToDelete.id)
          )
        )

        .then(history.push("/"))
        .catch(console.error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => history.push("decks/new/")}
            >
              <i className="bi-plus"></i>
              Create Deck
            </button>
            <div className="card-deck d-flex flex-column bd-highlight mb-3">
              {allDecks.map((deck, index) => (
                <Deck
                  deck={deck}
                  key={index}
                  handleDeckDelete={() => handleDeckDelete(deck)}
                />
              ))}
            </div>
          </Route>

          <Route path="/decks/new">
            <CreateDeck decks={allDecks} setDecks={setAllDecks} />
          </Route>

          <Route path="/decks/:deckId">
            <ViewDeck
              handleDeckDelete={handleDeckDelete}
              decks={allDecks}
              setDecks={setAllDecks}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
