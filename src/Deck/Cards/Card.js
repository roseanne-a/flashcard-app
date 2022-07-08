import "./Card.css";
import { Switch, Route, useHistory, useParams } from "react-router-dom";

export default function Card({ card, front, handleCardDelete }) {
  const { deckId } = useParams();

  const history = useHistory();

  return (
    <Switch>
      <Route path="/decks/:deckId/study/">
        <>
          {front ? (
            <div className="mt-2 mb-3">
              <p className="card-text">{card.front}</p>
            </div>
          ) : (
            <div className="mt-2 mb-3">
              <p className="card-text">{card.back}</p>
            </div>
          )}
        </>
      </Route>
      <Route path="/decks/:deckId">
        <div className="card mt-3 mb-0 card-box">
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
              <div style={{ width: "50%" }}>
                <p className="card-text">{card.front}</p>
              </div>
              <div style={{ width: "50%" }}>
                <p className="card-text">{card.back}</p>
                <div className="d-flex justify-content-end  pt-5">
                  <div className="mr-3">
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        history.push(`/decks/${deckId}/cards/${card.id}/edit`)
                      }
                    >
                      <i className="bi-pencil icon"></i> Edit
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={handleCardDelete}
                    >
                      <i className="bi-trash icon pr-0"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Route>
    </Switch>
  );
}
