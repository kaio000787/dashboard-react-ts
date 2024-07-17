import React,{ useEffect} from "react";

import styles from "./ListaPortfolio.module.css";

import { useNavigate } from "react-router-dom";



import { Portfolio, getPortfolios, deletePortfolio } from "../../../services/portfolioService";



const ListaPortfolio: React.FC = () => {

    const navegate = useNavigate();


    const [portfolio, setPortfolio] = React.useState<Portfolio[]>([]);

    const fetchPortfolio = async () => {
        try {
            const portfolio = await getPortfolios();
            setPortfolio(portfolio);
        } catch (error) {
            console.log ("Erro ao buscar experiencias:", error);
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const handleEdit =(portfolio: Portfolio) => {
        navegate('/portfolio/cadastro', { state: portfolio});


    };

     const handleDelete = async (portfolio: Portfolio) => {
        try {
            await deletePortfolio(portfolio);
            fetchPortfolio();
            alert("Experiência excluida com sucesso");
        } catch (error) {
            console.log ("Erro ao excluir experiencia:", error);
            alert("ocorreu um erro ao excluir experiencia");
        }
     };


    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Imagem</th>
                    <th>Link</th>
                    {<th>Ações</th> }
                </tr>
            </thead>
            <tbody>
                {portfolio.map((portfolio, index) => (
                    <tr key={index}>
                        <td>{portfolio.title}</td>
                        <td><img src={portfolio.image} alt={portfolio.title} className={styles.image} /></td>
                        <td><a href={portfolio.link} target="_blank" rel="noreferrer">{portfolio.link}</a></td>
                        <td>
                            <button onClick={() => handleEdit(portfolio)}>Editar</button>
                            <button onClick={() => handleDelete(portfolio)}>Excluir</button>
                        </td> 
                    </tr>
                ))}
            </tbody>
        </table>
            
    );
};

export default ListaPortfolio;