import { useForm } from "react-hook-form";
import { ModalStyled } from "../create-contact-modal/styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { UserContext, iContact } from "../../providers/userProvider";
import { Input } from "../input";
import { api } from "../../services/api";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email({ message: "Informe um email válido" }),
  full_name: z.string().min(8, { message: "Comprimento mínimo 8" }),
  phone: z
    .string()
    .max(11)
    .min(11, { message: "Telefone deve ser DDDxxxxxxxxx" }),
});


type DataProps = z.infer<typeof schema>;

interface ModalProps {
    contact: iContact
    editModalStatus: boolean
    setEditModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}
export const EditContactModal = ({contact, editModalStatus, setEditModalStatus}: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>({ resolver: zodResolver(schema) });

  const { contactList, setContactList } = useContext(UserContext);

  const editContact = async (data: DataProps) => {
    try {
      const response = await api.patch(`/contacts/${contact.id}`, data);
      const newContactList = contactList.map(contactObj => {
        if(contactObj.id === contact.id){
          return {...contactObj, ...response.data}
        }else{
          return contactObj
        }
      })
      setContactList(newContactList);
      setEditModalStatus(!editModalStatus)
      toast.success("Contato atualizado")
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <ModalStyled>
      <h3>Editar contato</h3>
      <div>
        <form onSubmit={handleSubmit(editContact)}>
          <Input
            {...register("full_name")}
            type="text"
            placeholder="Digite o nome completo"
            helperText={errors.full_name?.message}
            defaultValue={contact.full_name}
            
          />
          <Input
            {...register("email")}
            type="text"
            placeholder="Digite o nome completo"
            helperText={errors.email?.message}
            defaultValue={contact.email}
          />
          <Input
            {...register("phone")}
            type="text"
            placeholder="Digite o nome completo"
            helperText={errors.phone?.message}
            defaultValue={contact.phone}
          />
          <div id="form-btns">
            <button type="submit">Atualizar</button>
            <button type="button" onClick={() => setEditModalStatus(!editModalStatus)}>Cancelar</button>
          </div>
        </form>
      </div>
    </ModalStyled>
  );
};
