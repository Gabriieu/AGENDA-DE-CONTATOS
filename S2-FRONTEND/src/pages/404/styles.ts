import { styled } from "styled-components";

export const Page404Styled = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    a{
        color: yellow;
    }
  }
`;
