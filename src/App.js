import { useState } from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header.component";
import FeedbackList from "./component/FeedbackList.component";
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./component/FeedbackStats.component";
import FeedbackForm from "./component/FeedbackForm.component";
import AboutPage from "./pages/AboutPage";
import { FeedbackProvider } from "./context/FeedbackContext"; //curly braces because it not a default export

export default function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="App">
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </div>
            }
          ></Route>
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </FeedbackProvider>
  );
}
