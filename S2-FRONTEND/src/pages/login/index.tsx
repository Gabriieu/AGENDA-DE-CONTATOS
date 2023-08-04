import { zodResolver } from "@hookform/resolvers/zod";
import { schema, tLogin } from "./validator";
import { useForm } from "react-hook-form";
import { LoginStyled } from "./styles";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { useContext, useEffect } from "react";
import { UserContext } from "../../providers/userProvider";
import { InputPassword } from "../../components/input-password";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tLogin>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const { signIn } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token")

    if(token){
      navigate("/dashboard")
    }
  }, [])
  return (
    <LoginStyled>
      <div>
        <h1>Bem vindo</h1>
        <div>
          <form onSubmit={handleSubmit(signIn)}>
            <Input
              {...register("email")}
              type="email"
              placeholder="Digite seu email"
              helperText={errors.email?.message}
            />
            <InputPassword
              {...register("password")}
              placeholder="Digite sua senha"
              helperText={errors.password?.message}
            />
            <div id="form-login-btn">
              <button type="submit">Entrar</button>
              <div id="register-btns">
                <h4>Ainda não é cadastrado?</h4>
                <a href="" onClick={() => navigate("/register")}>
                  <p>cadastre-se agora</p>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LoginStyled>
  );
};
