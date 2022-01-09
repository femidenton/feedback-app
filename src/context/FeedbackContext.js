import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";

// creates a new context
const FeedbackContext = createContext();

//create a Provider. the components will be wrapped in a provider toget access to state
//state and function will be passed into <Feedback.provider/> as a value (prop called value)
export const FeedbackProvider = ({ children }) => {
  //This state will be passed down to other components using <Feedback.provider/>
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is feedback 1",
      rating: 10
    },
    {
      id: 2,
      text: "This is from feedback 2",
      rating: 7
    },
    {
      id: 3,
      text: "This is from feedback 3",
      rating: 9
    }
  ]);
  //state to edit feedback
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  // delete a feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      setFeedback(feedback.filter((item) => item.id !== id));
      //console.log("app", id);
    }
  };

  // add a new feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  //Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
