import React from "react";
import styles from "./InformacoesCard.module.css";

import { Informacoes } from "../../../../services/informacoesService";

interface InformacoesCardProps {
    informacao: Informacoes;
}

const  InformacoesCard: React.FC<InformacoesCardProps> = ({ informacao }) => {
    const {foto , nome , cargo , resumo} = informacao;

    return (
        <div className={styles.card}>
            <img src={foto} alt={`${nome} 's foto `} className={styles.foto} />
            <div className={styles.content}>
                <h3 className={styles.nome}>{nome}</h3>
                <p className={styles.cargo}>{cargo}</p>
                <p className={styles.resumo}>{resumo}</p>
            </div>
        </div>
    )
};
export default InformacoesCard