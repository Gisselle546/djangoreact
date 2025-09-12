import React, { useState } from "react";

type Props = {
  correctAnswer: string;
  setCorrect: any;
};

function PromoInput({ correctAnswer, setCorrect }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      if (inputValue === correctAnswer) {
        setCorrect(true);
      } else {
        alert("Incorrect. Please try again.");
      }
      setInputValue("");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <input
        type="text"
        placeholder="Promo Code"
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default PromoInput;
