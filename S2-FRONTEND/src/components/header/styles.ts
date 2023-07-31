import { styled } from "styled-components";

export const HeaderStyled = styled.header`
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: var(--color-blue-900);
  padding: 0.5rem 5rem 0.5rem 5rem;

  font-family: Verdana, Geneva, Tahoma, sans-serif;
  > div {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #header-btns {
    display: flex;
  }

  #header-name {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  > div button:hover {
    background-color: var(--color-blue-300);
    transform: scale(1.1);
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    margin: 12px;
    border-radius: 16px;
    border: 0px;
    background-color: var(--color-blue-600);
    color: white;
  }

  #desktop {
    display: none;
  }

  @media (min-width: 1024px) {
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #menu {
      display: none;
    }
    #desktop {
      display: flex;
      flex-direction: row;
      width: 100vw;
    }
  }
`;

export const Menu = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-evenly;
  width: 100vw;
  background-color: var(--color-blue-900);

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    margin: 12px;
    border-radius: 16px;
    border: 0px;
    background-color: var(--color-blue-600);
    color: white;
  }

`;
