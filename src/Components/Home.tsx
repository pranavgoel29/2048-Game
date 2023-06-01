import React, { useState } from "react";
import styled from "styled-components";

const BoardWrapper = styled.div`
  background: #b6b6b6;
  width: max-content;
  margin: auto;
  display: flex;
  margin-top: 20px;
  padding: 10px;
  border-radius: 12px;
`;

const BlockWrapper = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 5px;
  margin: 8px;
  display: flex;
  background: #848484;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: white;
`;

const Block = ({ num }) => {
  return <BlockWrapper>{num !== 0 ? num : ""}</BlockWrapper>;
};

const Home = () => {
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

export default Home;
