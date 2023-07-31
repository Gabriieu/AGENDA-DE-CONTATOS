import { useNavigate } from "react-router-dom"
import Logo404 from "../../assets/404-logo.png"
import { Page404Styled } from "./styles"
import {BiArrowBack} from "react-icons/bi"


export const Page404 = () => {
    const navigate = useNavigate()

    return (
        <Page404Styled>
            <div>
                <img src={Logo404} alt="" />
                <h1>ERRO 404</h1>
                <h1>{"< PÁGINA NÃO ENCONTRADA />"}</h1>
                <a onClick={() => navigate("/")} href="">
                    <p><BiArrowBack/> Voltar para o início</p>
                </a>
            </div>
        </Page404Styled>
    )
}