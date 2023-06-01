import React from "react";
import Board from "./Board";
import styled from "styled-components";
import theme from "../styles/theme";

const HomeWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  background: ${theme.backgroundColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 40px 0px 10px 0px;
    font-family: "Montserrat", sans-serif;
    color: ${theme.secondaryColor};
  }
`;

const Home = () => {
  return (
    <HomeWrapper>
      <h1>2048 Game</h1>
      <Board />
    </HomeWrapper>
  );
};

export default Home;
