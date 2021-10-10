import { useState, useEffect } from "react";
import "normalize.css";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Typography from "./styles/Typograpgy";
import Button from "@mui/material/Button";
import { CHOICES } from "./utils/constants";

type ChoiceDisplay = {
  isPlayer?: boolean;
  computerChoice?: string;
  playerChoice?: string;
};

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: auto 2fr 1fr;
  position: relative;
  min-height: calc(100vh - 3px);
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  @media (max-width: 490px) {
    font-size: 1.5rem;
  }
`;

const PlayerActionsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  justify-content: center;
  align-items: center;
  gap: 15rem;
  position: absolute;
  bottom: 0;
  @media (max-width: 800px) {
    gap: 10rem;
  }
  @media (max-width: 490px) {
    gap: 5rem;
  }
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
  ${(props) =>
    !props.isPlayer &&
    !props.computerChoice &&
    props.playerChoice &&
    "animation: shake 0.5s;"}
  animation-iteration-count: infinite;
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
  @media (max-width: 800px) {
    width: 10rem;
    height: 10rem;
    font-size: 3rem;
  }
  @media (max-width: 490px) {
    width: 8rem;
    height: 8rem;
    font-size: 2rem;
  }
`;

const StlyedGameContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
  @media (max-width: 490px) {
    gap: 2rem;
  }
`;

const StyledResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  font-size: 5rem;
  @media (max-width: 490px) {
    font-size: 2rem;
  }
`;

const StyledPlayButton = styled(Button)`
  &.MuiButtonBase-root {
    background: var(--hazyWhite);
    color: var(--secondaryBlue);
    font-weight: bold;
    font-size: 1.5rem;
    :hover {
      background: var(--grey);
    }
    @media (max-width: 490px) {
      font-size: 1.2rem;
    }
  }
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
      transform: scale(1.1);
    }
    @media (max-width: 800px) {
      width: 10rem;
      height: 10rem;
      font-size: 3rem;
    }
    @media (max-width: 490px) {
      width: 8rem;
      height: 8rem;
      font-size: 2rem;
    }
  }
`;

function App() {
  const [playerChoice, setPlayerChoice] = useState<string>("");
  const [computerChoice, setComputerChoice] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const generateComputerChoice = () => {
    const choices = [CHOICES.ROCK, CHOICES.PAPER, CHOICES.SCISSORS];
    const randomIndex = Math.floor(Math.random() * choices.length);
    setComputerChoice(choices[randomIndex]);
  };

  const getWinner = (playerChoice: string, computerChoice: string) => {
    if (playerChoice === computerChoice) {
      return "It's a draw!";
    }
    if (playerChoice === CHOICES.ROCK) {
      return computerChoice === CHOICES.SCISSORS ? "You win!" : "You lose!";
    }
    if (playerChoice === CHOICES.PAPER) {
      return computerChoice === CHOICES.ROCK ? "You win!" : "You lose!";
    }
    if (playerChoice === CHOICES.SCISSORS) {
      return computerChoice === CHOICES.PAPER ? "You win!" : "You lose!";
    }
    return "";
  };

  const handlePlayerChoice = (choice: string) => {
    setPlayerChoice(choice);
    setTimeout(() => {
      generateComputerChoice();
    }, 1500);
  };

  // Set result when user and player choices are set
  useEffect(() => {
    if (playerChoice && computerChoice) {
      setResult(getWinner(playerChoice, computerChoice));
    }
  }, [playerChoice, computerChoice]);

  const displayChoice = (choice: string) => {
    switch (choice) {
      case CHOICES.ROCK:
        return "✊";
      case CHOICES.PAPER:
        return "🤚";
      case CHOICES.SCISSORS:
        return "✌️";
      default:
        return "?";
    }
  };

  const resetGame = () => {
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
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
            <StyledChoiceDisplay isPlayer>
              {displayChoice(playerChoice)}
            </StyledChoiceDisplay>
          </ChoiceContainer>
          <StyledResultContainer>
            <span>{result}</span>
            {result && (
              <StyledPlayButton onClick={resetGame}>
                Play again
              </StyledPlayButton>
            )}
          </StyledResultContainer>
          <ChoiceContainer>
            <span>Computer</span>
            <StyledChoiceDisplay
              playerChoice={playerChoice}
              computerChoice={computerChoice}
            >
              {displayChoice(computerChoice)}
            </StyledChoiceDisplay>
          </ChoiceContainer>
        </StlyedGameContainer>
        {!playerChoice && (
          <PlayerActionsContainer>
            <StyledButton onClick={() => handlePlayerChoice(CHOICES.ROCK)}>
              ✊
            </StyledButton>
            <StyledButton onClick={() => handlePlayerChoice(CHOICES.PAPER)}>
              🤚
            </StyledButton>
            <StyledButton onClick={() => handlePlayerChoice(CHOICES.SCISSORS)}>
              ✌️
            </StyledButton>
          </PlayerActionsContainer>
        )}
      </StyledContainer>
    </>
  );
}

export default App;
