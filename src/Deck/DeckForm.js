import "./Deck.css";

function DeckForm({
  onSubmitHandler,
  onCancel,
  submitLabel,
  cancelLabel,
  deckData,
  setDeckData,
}) {
  const onChangeHandler = ({ target }) => {
    setDeckData({ ...deckData, [target.name]: target.value });
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-group">
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            size="53"
            value={deckData.name}
            onChange={onChangeHandler}
            className="form-control"
            placeholder="Deck name"
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            rows="5"
            cols="55"
            value={deckData.description}
            onChange={onChangeHandler}
            required
            className="form-control"
            placeholder="Brief description of the deck"
          />
        </label>
      </div>
      <button
        type="button"
        className="btn btn-secondary mr-3"
        onClick={onCancel}
      >
        {cancelLabel}
      </button>
      <button type="submit" className="btn btn-primary">
        {submitLabel}
      </button>
    </form>
  );
}
export default DeckForm;
