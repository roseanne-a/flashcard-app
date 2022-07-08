import "./Deck.css";

import { useHistory, Switch, Route, useRouteMatch } from "react-router-dom";

export default function Deck({ deck, handleDeckDelete }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path="/">
        <div className="card mt-3 mb-0 deck-box">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="card-title deck-title">{deck.name}</h5>
              </div>
              <div className="num-of-cards">
                {deck.cards ? <>{deck.cards.length} cards</> : <>0 cards</>}
              </div>
            </div>
            <p className="card-text deck-body">{deck.description}</p>
            <div className="d-flex">
              <div className="mr-3">
                <button
                  className="btn btn-secondary"
                  style={{ width: "6rem" }}
                  onClick={() => history.push(`/decks/${deck.id}`)}
                >
                  <i className="bi-eye icon"></i>
                  View
                </button>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  style={{ width: "6rem" }}
                  onClick={() => history.push(`/decks/${deck.id}/study`)}
                >
                  <i className="bi-book icon"></i>
                  Study
                </button>
              </div>
              <div className="ml-auto">
                <button
                  className="btn btn-danger"
                  style={{ width: "3rem" }}
                  onClick={handleDeckDelete}
                >
                  <i className="bi-trash icon pr-0"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Route>

      <Route path="/decks/:deckId">
        <div className="card deck-box">
          <div className="card-body">
            <h5 className="card-title deck-title">{deck.name}</h5>

            <p className="card-text deck-body">{deck.description}</p>
            <div className="d-flex">
              <div className="mr-3">
                <button
                  className="btn btn-secondary"
                  onClick={() => history.push(`/decks/${deck.id}/edit`)}
                >
                  <i className="bi-pencil icon"></i>
                  Edit
                </button>
              </div>
              <div className="mr-3">
                <button
                  className="btn btn-primary"
                  onClick={() => history.push(`${url}/study/1`)}
                >
                  <i className="bi-book icon"></i>
                  Study
                </button>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => history.push(`${url}/cards/new`)}
                >
                  <i className="bi-plus icon"></i>
                  Add Cards
                </button>
              </div>

              <div className="ml-auto">
                <button
                  className="btn btn-danger"
                  style={{ width: "3rem" }}
                  onClick={handleDeckDelete}
                >
                  <i className="bi-trash icon pr-0"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Route>
    </Switch>
  );
}
