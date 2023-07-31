import { ReactNode, createContext, useEffect, useState } from "react";
import { tLogin } from "../pages/login/validator";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

export interface iUser {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  created_at: string;
}

export interface iContact {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface iContactRequest {
  full_name: string;
  email: string;
  phone: string;
}

interface iUserProviderProps {
  children: ReactNode;
}

interface iUserContextValues {
  signIn: (data: tLogin) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  contactList: iContact[];
  setContactList: React.Dispatch<React.SetStateAction<iContact[]>>;
  getUserInfo: () => Promise<void>
  user: iUser | null;
  setUser: React.Dispatch<React.SetStateAction<iUser | null>>;
}

export const UserContext = createContext({} as iUserContextValues);

export const UserProvider = ({ children }: iUserProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<iUser | null>(null);
  const [contactList, setContactList] = useState<iContact[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    
    if (!token) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;


    setLoading(false)
  }, [user, contactList]);

  const signIn = async (data: tLogin) => {
    try {
      const response = await api.post("/login", data);
      const token = response.data.token;

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const getUserInfo = async () => {
    const userInfo: any = jwt_decode(token!);
    const userID: number = Number(userInfo.sub);
    try {
      const response = await api.get(`/user/${userID}`);
      setUser(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    try {
      const response = await api.get("/contacts");
      setContactList(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <UserContext.Provider
      value={{ signIn, loading, setLoading, getUserInfo, user, setUser, contactList, setContactList }}
    >
      {children}
    </UserContext.Provider>
  );
};
