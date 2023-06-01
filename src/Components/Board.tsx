import React, { useState } from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const BoardWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  background: ${theme.backgroundAccentColor};
  width: max-content;
  margin: auto;
  display: flex;
  margin-top: 20px;
  padding: 10px;
  border-radius: 12px;
`;

const BlockWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  height: 80px;
  width: 80px;
  border-radius: 5px;
  font-weight: 600;
  margin: 8px;
  display: flex;
  background: ${theme.cardBackgroundAccentColor};
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: ${theme.secondaryColor};
`;

const Block = ({ num }) => {
  return (
    <BlockWrapper>
      {num}
      {/* {num !== 0 ? num : ""} */}
    </BlockWrapper>
  );
};

const Board = () => {
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  return (
    <BoardWrapper>
      {grid.map((singleRow, index) => {
        return (
          <div key={index}>
            {singleRow.map((digit, digitIndex) => (
              <Block num={digit} key={digitIndex} />
            ))}
          </div>
        );
      })}
    </BoardWrapper>
  );
};

export default Board;
