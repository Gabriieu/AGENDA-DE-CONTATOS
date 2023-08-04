import { styled } from "styled-components";

export const ModalStyled = styled.dialog`
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  width: 100vw;
  height: 100vh;
  position: fixed;
  gap: 2rem;

  #modal-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg{
      color: red;
    }
  }
  #form-btns{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    
    button{
        padding: 1rem;
        border-radius: 16px;
        border: 0;
    }
  }
`;
