import { styled } from "styled-components";

export const LoginStyled = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  form {
    padding: 2rem;
  }
  input{
    margin: 2rem 0 0 0;
  }
  #form-login-btn {
    padding: 1rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      padding: 1rem;
      border-radius: 16px;
      border: 0;
    }
    button:hover {
      box-shadow: 0px 15px 20px var(--color-gray-800, 0.4);
      transform: translateY(-2px);
    }

    #register-btns {
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        color: var(--color-blue-800);
      }
    }
  }

  #form-register-btns {
    display: flex;
    justify-content: space-around;
    margin: 1rem;
    button {
      padding: 1rem;
      border-radius: 16px;
      border: 0;
    }
  }
`;

export const ErrorMessageStyled = styled.p`
  font-size: 16px;
  color: red;
`;
