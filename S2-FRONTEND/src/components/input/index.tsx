import { InputHTMLAttributes, forwardRef, useId } from "react";
import { ContainerStyled, HelperTextStyled, InputStyled, LabelStyled } from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    helperText?: string
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", name = "", label="", helperText="", ...props }, ref) => {
    const inputId = useId()
    return (
      <ContainerStyled>
        <LabelStyled htmlFor={inputId}>{label}</LabelStyled>
        <InputStyled id={inputId} type={type} name={name} ref={ref} {...props} />
        {helperText.length > 0 && <HelperTextStyled>{helperText}</HelperTextStyled>}
      </ContainerStyled>
    );
  }
);
