import { styled } from "styled-components";

export const CardStyled = styled.li`
  background-color: var(--color-blue-700);
  border-radius: 8px;
  width: 100vw;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  #card-div {
    background-color: var(--color-blue-600);
    border-radius: 8px;
    padding: 1rem;
    div{
      padding: .3rem;
    }
  }
  #card-btns {
    display: flex;
    justify-content: space-between;
    button {
      border-radius: 16px;
      padding: 8px;
      border: 0;
    }
    button:hover {
      background-color: var(--color-blue-400);
      box-shadow: 0px 15px 20px var(--color-blue-900, 0.4);
      color: #fff;
      transform: translateY(-5px);
    }
  }

  @media(min-width: 768px){
    width: 40vw;
  }
`;
