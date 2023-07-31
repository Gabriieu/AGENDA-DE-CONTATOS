import { styled } from "styled-components";

export const InputStyled = styled.input`
    padding: 1rem;
    border-radius: 16px;
    border: 1px solid var(--color-blue-600);
    margin-top: 8px;

    &:focus{
        border-color: green
    }
`
export const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
`
export const LabelStyled = styled.label`

`

export const HelperTextStyled = styled.p`
    color: red;
`