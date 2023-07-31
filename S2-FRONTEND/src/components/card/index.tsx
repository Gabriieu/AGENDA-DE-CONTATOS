import { useState } from "react";
import { iContact } from "../../pages/dashboard";
import { ConfirmModal } from "../confirm-modal";
import { CardStyled } from "./styles";
import { EditContactModal } from "../edit-contact-modal";

interface CardProps {
  contact: iContact;
}

export const Card = ({ contact }: CardProps) => {
  const [deleteModalStatus, setdeleteModalStatus] = useState(false);
  const [editModalStatus, setEditModalStatus] = useState(false);

  return (
    <>
      {deleteModalStatus && (
        <ConfirmModal
          contactId={contact.id}
          message={`Deseja excluir ${contact.full_name} da sua lista?`}
          setModalStatus={setdeleteModalStatus}
        />
      )}
      {editModalStatus && (
        <EditContactModal
          contact={contact}
          editModalStatus={editModalStatus}
          setEditModalStatus={setEditModalStatus}
        />
      )}
      <CardStyled key={contact.id}>
        <div id="card-div">
          <div>
            <label>Nome</label>
            <h3>{contact.full_name}</h3>
          </div>
          <div>
            <label>Email</label>
            <h3>{contact.email}</h3>
          </div>
          <div>
            <label>Telefone</label>
            <h3>{contact.phone}</h3>
          </div>
        </div>
        <div id="card-btns">
          <button onClick={() => setEditModalStatus(!editModalStatus)}>
            Editar
          </button>
          <button onClick={() => setdeleteModalStatus(!deleteModalStatus)}>
            Excluir
          </button>
        </div>
      </CardStyled>
    </>
  );
};
