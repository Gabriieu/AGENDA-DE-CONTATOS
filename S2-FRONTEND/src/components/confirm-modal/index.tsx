import { useContext } from "react"
import { api } from "../../services/api"
import { ConfirmModalStyle } from "./styles"
import { UserContext } from "../../providers/userProvider"

interface ModalProps {
    contactId: number
    message: string
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConfirmModal = ({contactId, message, setModalStatus}: ModalProps) => {
    const {contactList, setContactList} = useContext(UserContext)
    const token = localStorage.getItem("token")

    const deleteContact = async (contactId: number) => {
        await api.delete(`/contacts/${contactId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const newList = contactList.filter(contact => contact.id !== contactId)
        setContactList(newList)
        setModalStatus(false)
    }

    return (
        <ConfirmModalStyle>
            <div id="confirm-msg">
                <h2>{message}</h2>
            </div>
            <div>
                <button onClick={() => deleteContact(contactId)}>Excluir</button>
                <button onClick={() => setModalStatus(false)}>Cancelar</button>
            </div>
        </ConfirmModalStyle>
    )
}