import { useForm } from "react-hook-form";
import { Input } from "../input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalStyled } from "../create-contact-modal/styles";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { UserContext } from "../../providers/userProvider";
import { api } from "../../services/api";
import { VscTrash } from "react-icons/vsc";
import { DeleteProfileModal } from "../delete-user-modal";

const schema = z.object({
  full_name: z.string().max(50, {
    message: "Tamanho máximo do nome não pode exceder 50 caracteres",
  })
  .min(3, { message: "O nome deve ter no mínimo 8 caracteres" }).optional().or(z.literal(``)),
  email: z.string().email().optional().or(z.literal(``)),
  phone: z.string().optional().or(z.literal(``)),
  password: z
    .string()
    .min(8, { message: "Senha deve possuir no mínimo 8 caracteres" })
    .optional()
    .or(z.literal(``)),
});

interface iUpdateRequest {
  full_name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

interface ModalProps {
  modalUpdateStatus: boolean;
  setModalUpdateStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpdateUserModal = ({
  modalUpdateStatus,
  setModalUpdateStatus,
}: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUpdateRequest>({
    resolver: zodResolver(schema.partial()),
  });
  const { user, setUser } = useContext(UserContext);
  const [modalDeleteStatus, setModalDeleteStatus] = useState<boolean>(false);

  const updateUser = async (data: iUpdateRequest) => {
    const updatedData: iUpdateRequest = schema.parse(data);
    

    const filteredData: iUpdateRequest = Object.fromEntries(
      Object.entries(updatedData).filter(([, value]) => value !== "")
    );
    try {
      const response = await api.patch(`/user/${user!.id}`, filteredData);

      setUser(response.data);
      toast.success("Perfil atualizado");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setModalUpdateStatus(!modalUpdateStatus);
  };

  return (
    <>
      {
      modalDeleteStatus && (
        <DeleteProfileModal
          modalDeleteStatus={modalDeleteStatus}
          setModalDeleteStatus={setModalDeleteStatus}
        />
      )
    }
    <ModalStyled>
      <form onSubmit={handleSubmit(updateUser)}>
        <div id="modal-header">
          <h1>Editar usuário</h1>
          <div onClick={() => setModalDeleteStatus(!modalDeleteStatus)}><VscTrash /></div>
        </div>
        <Input
          {...register("email")}
          type="email"
          placeholder="Digite o email"
          helperText={errors.email?.message}
          defaultValue={user?.email}
        />
        <Input
          {...register("full_name")}
          type="text"
          placeholder="Digite seu nome completo"
          helperText={errors.full_name?.message}
          defaultValue={user?.full_name}
        />
        <Input
          {...register("phone")}
          type="text"
          placeholder="Digite seu telefone"
          helperText={errors.phone?.message}
          defaultValue={user?.phone}
        />
        <Input
          {...register("password")}
          type="password"
          placeholder="Nova senha"
          helperText={errors.password?.message}
          defaultValue=""
        />
        <div id="form-btns">
          <button type="submit">Atualizar</button>
          <button
            type="button"
            onClick={() => setModalUpdateStatus(!modalUpdateStatus)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </ModalStyled>
    </>
  );
};
