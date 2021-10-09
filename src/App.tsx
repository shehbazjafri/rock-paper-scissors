import { useState, useEffect } from "react";
import "normalize.css";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Typography from "./styles/Typograpgy";
import Button from "@mui/material/Button";

type ChoiceDisplay = {
  isPlayer?: boolean;
};

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  position: relative;
  min-height: calc(100vh - 3px);
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
`;

const PlayerActionsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  justify-content: center;
  align-items: center;
  gap: 15rem;
  background: var(--secondaryBlue);
  position: absolute;
  bottom: 0;
`;

const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const StyledChoiceDisplay = styled.div<ChoiceDisplay>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 15rem;
  border: 1rem solid
    ${(props) => (props?.isPlayer ? "var(--green)" : "var(--red)")};
  background: var(--hazyWhite);
  border-radius: 9rem;
  font-size: 7rem;
  color: var(--black);
`;

const StlyedGameContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
`;

const StyledResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  &.MuiButtonBase-root {
    width: 15rem;
    height: 15rem;
    border: 1rem solid var(--purple);
    background: var(--hazyWhite);
    border-radius: 9rem;
    font-size: 5rem;
    :hover {
      background: var(--grey);
    }
  }
`;

function App() {
  const [playerChoice, setPlayerChoice] = useState<string>("");
  const [computerChoice, setComputerChoice] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const generateComputerChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    setComputerChoice(choices[randomIndex]);
  };

  const getWinner = (playerChoice: string, computerChoice: string) => {
    if (playerChoice === computerChoice) {
      return "It's a draw!";
    }
    if (playerChoice === "rock") {
      return computerChoice === "scissors" ? "You win!" : "You lose!";
    }
    if (playerChoice === "paper") {
      return computerChoice === "rock" ? "You win!" : "You lose!";
    }
    if (playerChoice === "scissors") {
      return computerChoice === "paper" ? "You win!" : "You lose!";
    }
    return "";
  };

  const handlePlayerChoice = (choice: string) => {
    setPlayerChoice(choice);
    generateComputerChoice();
  };

  // Set result when user and player choices are set
  useEffect(() => {
    if (playerChoice && computerChoice) {
      setResult(getWinner(playerChoice, computerChoice));
    }
  }, [playerChoice, computerChoice]);

  const displayChoice = (choice: string) => {
    switch (choice) {
      case "rock":
        return "✊";
      case "paper":
        return "🤚";
      case "scissors":
        return "✌️";
      default:
        return "";
    }
  };

  return (
    <>
      <GlobalStyles />
      <Typography />
      <StyledContainer>
        <StyledHeader>
          <h1>Rock, Paper, Scissors</h1>
        </StyledHeader>
        <StlyedGameContainer>
          <ChoiceContainer>
            <span>Player</span>
            <StyledChoiceDisplay isPlayer={true}>
              {displayChoice(playerChoice)}
            </StyledChoiceDisplay>
          </ChoiceContainer>
          <StyledResultContainer>{result}</StyledResultContainer>
          <ChoiceContainer>
            <span>Computer</span>
            <StyledChoiceDisplay>
              {displayChoice(computerChoice)}
            </StyledChoiceDisplay>
          </ChoiceContainer>
        </StlyedGameContainer>
        <PlayerActionsContainer>
          <StyledButton onClick={() => handlePlayerChoice("rock")}>
            ✊
          </StyledButton>
          <StyledButton onClick={() => handlePlayerChoice("paper")}>
            🤚
          </StyledButton>
          <StyledButton onClick={() => handlePlayerChoice("scissors")}>
            ✌️
          </StyledButton>
        </PlayerActionsContainer>
      </StyledContainer>
    </>
  );
}

export default App;
