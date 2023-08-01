import { useContext, useState } from "react";
import * as S from "./styles";
import { CreateContactModal } from "../create-contact-modal";
import { useNavigate } from "react-router-dom";
import { UpdateUserModal } from "../update-user-modal";
import { UserContext } from "../../providers/userProvider";
import { BsPersonAdd } from "react-icons/bs";
import { LiaUserEditSolid } from "react-icons/lia";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx"

export const Header = () => {
  const [createContactModalStatus, setCreateContactModalStatus] =
    useState<boolean>(false);
  const [modalUpdateStatus, setModalUpdateStatus] = useState<boolean>(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const navigate = useNavigate();
  const { setContactList, setUser } = useContext(UserContext);

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    setContactList([]);
    navigate("/");
  };

  const { user } = useContext(UserContext);

  const firstName = user?.full_name.split(" ")[0];
  return (
    <>
      {modalUpdateStatus && (
        <UpdateUserModal
          modalUpdateStatus={modalUpdateStatus}
          setModalUpdateStatus={setModalUpdateStatus}
        />
      )}
      {createContactModalStatus && (
        <CreateContactModal
          createContactModalStatus={createContactModalStatus}
          setCreateContactModalStatus={setCreateContactModalStatus}
        />
      )}
      <S.HeaderStyled>
        <div >
          <h2>Bem vindo(a), {firstName}!</h2>
          <div id="menu">
          {
            displayMenu ? (<div onClick={() => setDisplayMenu(!displayMenu)}><TfiClose/></div>) : (<div onClick={() => setDisplayMenu(!displayMenu)}><RxHamburgerMenu/></div>)
          }
          </div>
          <S.Menu id="desktop">
                <button
                  id="new-contact-btn"
                  onClick={() =>
                    setCreateContactModalStatus(!createContactModalStatus)
                  }
                >
                  <BsPersonAdd /> Novo contato
                </button>
                <button
                  id="edit-profile-btn"
                  onClick={() => setModalUpdateStatus(!modalUpdateStatus)}
                >
                  <LiaUserEditSolid /> Editar perfil
                </button>
                <button id="logout-btn" onClick={logOut}>
                  <FiLogOut /> Logout
                </button>
              </S.Menu>
        </div>
      </S.HeaderStyled>
          {
            displayMenu && (
              <S.Menu>
                <button
                  id="new-contact-btn"
                  onClick={() =>
                    setCreateContactModalStatus(!createContactModalStatus)
                  }
                >
                  <BsPersonAdd /> Novo contato
                </button>
                <button
                  id="edit-profile-btn"
                  onClick={() => setModalUpdateStatus(!modalUpdateStatus)}
                >
                  <LiaUserEditSolid /> Editar perfil
                </button>
                <button id="logout-btn" onClick={logOut}>
                  <FiLogOut /> Logout
                </button>
              </S.Menu>
            )
          }
    </>
    
  );
};
