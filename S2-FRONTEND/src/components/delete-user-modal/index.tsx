import { useContext } from "react";
import { ConfirmModalStyle } from "../confirm-modal/styles";
import { UserContext } from "../../providers/userProvider";
import { api } from "../../services/api";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";


interface Props {
    modalDeleteStatus: boolean
    setModalDeleteStatus: React.Dispatch<React.SetStateAction<boolean>>
}
export const DeleteProfileModal = ({modalDeleteStatus, setModalDeleteStatus}: Props) => {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const deleteUser = async(userId: number) => {
        try {
            await api.delete(`/user/${userId}`)
            setUser(null)
            localStorage.clear()
            navigate("/")
            toast.info("Sua conta foi excluída 😢")
        } catch (error: any) {
            toast.error(error)
        }
    }

  return (
    <ConfirmModalStyle>
      <div id="confirm-msg">
        <h2>Tem certeza que você quer excluir sua conta permanentemente?</h2>
      </div>
      <div>
        <button onClick={() => deleteUser(user!.id)}>Excluir</button>
        <button onClick={() => setModalDeleteStatus(!modalDeleteStatus)}>Cancelar</button>
      </div>
    </ConfirmModalStyle>
  );
};
