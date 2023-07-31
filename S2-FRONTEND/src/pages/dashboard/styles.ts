import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  header {
    background-color: var(--color-blue-700);
  }

  main {
    display: flex;
    gap: 20px;
  }
`;

export const Board = styled.ul`
  background-color: var(--color-blue-400);
  height: 100vh;
  width: 300px;
  list-style: none;
`;

export const Grade = styled.main`
  ul {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-width: 20vw;
    gap: 5rem;
    margin-top: 160px;
    align-items: center;

  @media(min-width: 768px){
    flex-direction: unset;
    justify-content: center;
    flex-wrap: wrap;
  }
  }
`;
