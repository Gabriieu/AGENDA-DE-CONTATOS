import { InputHTMLAttributes, forwardRef, useId, useState } from "react";
import {
  ContainerStyled,
  HelperTextStyled,
  InputStyled,
  LabelStyled,
} from "./styles";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ name = "", label = "", helperText = "", ...props }, ref) => {
    const [type, setType] = useState("password");

    const toggleType = () => {
      if (type == "text") {
        setType("password");
      } else {
        setType("text");
      }
    };

    const inputId = useId();
    return (
      <ContainerStyled>
        <LabelStyled htmlFor={inputId}>{label}</LabelStyled>
        <div id="hide-show-icon">
          <InputStyled
            id={inputId}
            type={type}
            name={name}
            ref={ref}
            {...props}
          />
          {type == "password" ? (<div className="icon" onClick={toggleType}><AiFillEye /></div>) : (<div className="icon" onClick={toggleType}><AiFillEyeInvisible /></div>)}
        </div>
        {helperText.length > 0 && (
          <HelperTextStyled>{helperText}</HelperTextStyled>
        )}
      </ContainerStyled>
    );
  }
);
