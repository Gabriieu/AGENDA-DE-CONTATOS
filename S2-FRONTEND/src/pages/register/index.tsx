import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { Input } from "../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { LoginStyled } from "../login/styles";
import { useEffect } from "react";

const schema = z.object({
  full_name: z
    .string()
    .max(50, {
      message: "Tamanho máximo do nome não pode exceder 50 caracteres",
    })
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
  phone: z
    .string()
    .min(11, { message: "O número de telefone deve ser DDD_xxxxxxxxx" })
    .max(11, { message: "O número de telefone deve ser DDD_xxxxxxxxx" }),
});

type DataProps = z.infer<typeof schema>;

type iUserCreate = z.infer<typeof schema>;

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const createUser = async (data: iUserCreate) => {
    try {
      await api.post("/user", data);
      toast.success("Cadastro realizado");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <LoginStyled>
      <h1>Registre-se</h1>
      <div>
        <form onSubmit={handleSubmit(createUser)}>
          <Input
            {...register("full_name")}
            type="text"
            placeholder="Digite nome completo"
            helperText={errors.full_name?.message}
          />
          <Input
            {...register("email")}
            type="text"
            placeholder="Digite seu email"
            helperText={errors.email?.message}
          />
          <Input
            {...register("password")}
            type="password"
            placeholder="Digite uma senha"
            helperText={errors.password?.message}
          />
          <Input
            {...register("phone")}
            type="text"
            placeholder="Digite seu número de celular"
            helperText={errors.phone?.message}
          />
          <div id="form-register-btns">
            <button type="submit">Cadastrar</button>
            <button type="button" onClick={() => navigate("/")}>
              Voltar
            </button>
          </div>
        </form>
      </div>
    </LoginStyled>
  );
};
