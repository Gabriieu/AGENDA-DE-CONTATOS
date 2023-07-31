import { useContext, useEffect } from "react";
import { Header } from "../../components/header";
import { Card } from "../../components/card";
import { Grade } from "./styles";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/userProvider";
import { UserHasNoContacts } from "../../components/no-contacts";

export interface iContact {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
}

export const Dashboard = () => {
  const { contactList, getUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    
    getUserInfo()
  }, []);

  return (
    <>
      <Header />
      {contactList.length > 0 ? (
        <Grade>
        <ul>
          {contactList.map((contact) => {
            return <Card contact={contact} key={contact.id} />;
          })}
        </ul>
      </Grade>
      ): (
        <UserHasNoContacts />
      )}
    </>
  );
};
