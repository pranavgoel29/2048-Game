import styled from "styled-components";
import theme from "../styles/theme";

const ControlButtonsWrapper = styled.div`
  margin-top: 20px;

  display: flex;
  flex-direction: column;

  align-items: center;

  .controlButtomBottomRow {
    display: flex;
    justify-content: space-between;
    text-align: center;
    gap: 6px;
    margin-top: 2px;
  }

  .play-button {
    font-family: "Montserrat", sans-serif;
    cursor: pointer;
    background: ${theme.buttonAccentColor};
    border-radius: 10px;
    border: none;
    height: 3rem;
    width: 100px;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    margin-top: 5px;

    text-align: center;
    color: ${theme.secondaryColor};
  }

  .play-button:hover {
    background: ${theme.buttonAccentColorHover};
  }
`;

export default ControlButtonsWrapper;
