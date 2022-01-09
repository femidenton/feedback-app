import Card from "./shared/Card.component";
import RatingSelect from "./RatingSelect";
import { useState, useContext, useEffect } from "react";
import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const [btnDisable, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");

  const { addFeedback, feedbackEdit } = useContext(FeedbackContext);

  useEffect(() => {
    setText(feedbackEdit.item.text);
    setRating(feedbackEdit.item.rating);
  }, [feedbackEdit]);
  const handleChangeText = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Text must be at least 10 characters");
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }
    setText(e.target.value);
  };

  const select = (ratingProp) => {
    setRating(ratingProp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      text,
      rating
    };
    addFeedback(newFeedback);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us</h2>
        <RatingSelect select={select} />
        <div className="input-group">
          <input
            onChange={handleChangeText}
            type="text"
            placeholder="Write a review"
            value={text}
          />

          <Button type="submit" isDisabled={btnDisable}>
            Send
          </Button>
        </div>
      </form>
      {message && <div className="message">{message}</div>}
    </Card>
  );
}
