import React, { useState } from "react";
import "./Home.css";

const Home = ({ onUnlock, onSecretAccess }) => {
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleBoxClick = () => {
    setIsQuestionVisible(true);
    setError("");
  };

  const validateAnswer = () => {
    if (answer.toLowerCase() === "rahul bhukar") {
      onUnlock();
    } else if (answer.toLowerCase() === "manku n puchku"){
      onSecretAccess();
    } else {
      setError("Oops! That's not the correct answer. Try again!");
    }
  };

  return (
    <div className="home-container">
      <div className="gift-box" onClick={handleBoxClick}>
        🎁
      </div>
      {isQuestionVisible && (
        <div className="question-container">
          <p className="question-text">What is Rahul's actual full name? (yes you know!)</p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
          />
          <button onClick={validateAnswer}>Submit</button>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Home;
