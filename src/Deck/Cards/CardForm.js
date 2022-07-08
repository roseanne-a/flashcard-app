function CardForm({
  onSubmitHandler,
  onCancel,
  submitLabel,
  cancelLabel,
  cardData,
  setCardData,
}) {
  const onChangeHandler = ({ target }) => {
    setCardData({ ...cardData, [target.name]: target.value });
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-group">
        <label htmlFor="front">
          Front
          <textarea
            id="front"
            name="front"
            rows="5"
            cols="55"
            value={cardData.front}
            onChange={onChangeHandler}
            required
            className="form-control"
            placeholder="Front side of card"
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="back">
          Back
          <textarea
            id="back"
            name="back"
            rows="5"
            cols="55"
            value={cardData.back}
            onChange={onChangeHandler}
            required
            className="form-control"
            placeholder="Back side of card"
          />
        </label>
      </div>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        {cancelLabel}
      </button>
      <button type="submit" className="btn btn-primary">
        {submitLabel}
      </button>
    </form>
  );
}
export default CardForm;
