import { styled } from "styled-components";

export const ConfirmModalStyle = styled.dialog`
  top: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  width: 100vw;
  height: 100vh;
  position: fixed;
  gap: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #confirm-msg{
    padding: 1rem;
    text-align: center;
  }

  div{
    display: flex;
    justify-content: space-evenly;
    width: 50%;
  }
  div > button{
    padding: 1rem;
    margin: 1rem;
    border-radius: 16px;
    border: 1px solid;
  }
`;
