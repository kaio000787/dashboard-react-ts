import React from "react";

import { Formik, Form } from "formik";

import * as Yup from "yup";

import styles from "./CadastrarPortfolio.module.css";
import Input from "../../../Components/forms/Input";

import { Portfolio, createOrUpdatePortfolio } from "../../../services/portfolioService";

import { useNavigate, useLocation } from "react-router-dom";
const CadastrarPortfolio: React.FC = () => {
    const navigate = useNavigate();
    const lacation = useLocation();
    const portfolio = lacation.state as Portfolio;

const initialValues: Portfolio = {
    id: "",
    link: "",
    image: "",
    title: "",
};

const validationSchema = Yup.object().shape({
    link: Yup.string().required("Este campo é obrigatório"),
    image: Yup.string().required("Este campo é obrigatório"),
    title: Yup.string().required("Este campo é obrigatório"),
});


    const onSubimit = async(values: Portfolio,{ resetForm }: { resetForm: () => void }) => {
        try{
            await createOrUpdatePortfolio(values);
            resetForm();
            alert("Formulario enviado com sucesso");
            navigate("/portfolio/lista");
        }catch(error){
            console.log(error);
            alert("ocorreu um erro ao enviar o formulário");
        }
    };

    return (
        <div className={styles.formwrapper}>
            <Formik
                initialValues={portfolio || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubimit}
            >
             {({ errors, touched }) => (
                <Form className={styles.form}>
                    <h2 className={styles.title}>Cadastro Portfolio</h2>
                    <Input
                        label="Link"
                        name="link"
                        errors={errors.link}
                        touched={touched.link}
                    />

                    <Input
                        label="Image"
                        name="image"
                        errors={errors.image}
                        touched={touched.image}
                    />

                    <Input
                        label="Titulo"
                        name="title"
                        errors={errors.title}
                        touched={touched.title}
                    />

                    <button type="submit" className={styles.button}>enviar</button>
                        
                </Form>
                )}
            </Formik>
        </div>

    );
};

export default CadastrarPortfolio;