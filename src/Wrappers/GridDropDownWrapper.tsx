import styled from "styled-components";

import { breakpoints } from "../styles/Breakpoints";

export const GridDropDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10px;

  .dropdown-select {
    background-color: #02429c;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
    width: 100%;
    height: 3rem;
    // max-width: 200px;
  }

  .dropdown-select option {
    background-color: #0356b1;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    color: white;
    padding: 10px;
    font-size: 16px;
  }

  .dropdown-select option:hover {
    background-color: #0671e0;
  }

  @media (max-width: ${breakpoints.sm}) {
    .dropdown-select {
      max-width: 100%;
    }
  }
`;
