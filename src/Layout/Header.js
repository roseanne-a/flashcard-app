import React from "react";
import { useHistory } from "react-router-dom";
import "./Index.css";

function Header() {
  const history = useHistory();
  return (
    <header className="jumbotron header">
      <div className="container text-white">
        <h1 className="display-4">Flashcard-o-matic</h1>
        <p className="lead">Discover The Flashcard Difference.</p>
      </div>
    </header>
  );
}

export default Header;
