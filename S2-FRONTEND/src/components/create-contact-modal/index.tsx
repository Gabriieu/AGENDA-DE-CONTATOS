import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../input";
import { ModalStyled } from "./styles";
import { useContext } from "react";
import { UserContext, iContactRequest } from "../../providers/userProvider";
import { api } from "../../services/api";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email({ message: "Informe um email válido" }),
  full_name: z.string().min(3, { message: "Comprimento mínimo 3" }),
  phone: z
    .string()
    .max(11)
    .min(11, { message: "Telefone deve ser DDDxxxxxxxxx" }),
});

type DataProps = z.infer<typeof schema>;

interface CreateContactModalProps {
  createContactModalStatus: boolean;
  setCreateContactModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateContactModal = ({
  createContactModalStatus,
  setCreateContactModalStatus,
}: CreateContactModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>({
    resolver: zodResolver(schema),
  });
  const { contactList, setContactList } = useContext(UserContext);

  const createContact = async (data: iContactRequest) => {
    try {
      const response = await api.post("/contacts", data, {
        headers: {
          Authorization: api.defaults.headers.common.Authorization,
        },
      });
      const newList = [...contactList, response.data];
      setContactList(newList);
      setCreateContactModalStatus(!createContactModalStatus)
      toast.success(`${response.data.full_name} adicionado`)
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <ModalStyled>
      <h3>Criar contato</h3>
      <div>
        <form onSubmit={handleSubmit(createContact)}>
          <Input
            {...register("email")}
            type="email"
            placeholder="Digite o email"
            helperText={errors.email?.message}
          />
          <Input
            {...register("full_name")}
            type="text"
            placeholder="Digite o nome completo"
            helperText={errors.full_name?.message}
          />
          <Input
            {...register("phone")}
            type="text"
            placeholder="Digite o número de telefone"
            helperText={errors.phone?.message}
          />
          <div id="form-btns">
            <button type="submit">Criar</button>
            <button
              type="button"
              onClick={() =>
                setCreateContactModalStatus(!createContactModalStatus)
              }
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </ModalStyled>
  );
};
