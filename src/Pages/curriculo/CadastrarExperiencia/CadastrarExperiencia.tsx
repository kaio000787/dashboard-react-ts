import React from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./CadastrarExperiencia.module.css";

import Input from "../../../Components/forms/Input/Input";
import Textarea from "../../../Components/forms/Textarea/Textarea";
import Select from "../../../Components/forms/Select";

import {Experiencia, createOrUpdateExperiencia,} from "../../../services/experienciaService";


const CadastrarExperiencia: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const experiencia = location.state as Experiencia;

  const initialValues: Experiencia = {
    id: "",
    titulo: "",
    descricao: "",
    tipo: "",
    anoInicio: "",
    anoFim: "",
  };

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("Este campo é obrigatório"),
    descricao: Yup.string(),
    tipo: Yup.string().required("Este campo é obrigatório"),
    anoInicio: Yup.number()
      .required("Este campo é obrigatório")
      .typeError("um número é obrigatório"),
    anoFim: Yup.number()
      .required("Este campo é obrigatório")
      .typeError("um número é obrigatório"),
  });

  const onSubimit = async (values: Experiencia,{ resetForm }: { resetForm: () => void }) => {
    try {
      await createOrUpdateExperiencia(values); 
      console.log(values);
      resetForm();
      navigate("/curriculo/experiencia/lista");
      alert("Formulario enviado com sucesso");
    } catch (error) {
      console.log(error);
      alert("ocorreu um erro ao enviar o formulário");
    }
  };

  return (
    <div className={styles.formwrapper}>
      <Formik
        initialValues={experiencia || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubimit}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <h2 className={styles.title}>Cadastrar de Experiência</h2>

            <Input
              label="Título"
              name="titulo"
              errors={errors.titulo}
              touched={touched.titulo}
            />

            <Input
              label="Ano Início"
              name="anoInicio"
              errors={errors.anoInicio}
              touched={touched.anoInicio}
            />

            <Input
              label="ano Fim"
              name="anoFim"
              errors={errors.anoFim}
              touched={touched.anoFim}
            />

            <Select
              label="Tipo de experiência"
              name="tipo"
              options={[
                { value: "profissional", label: "profissional" },
                { value: "academico", label: "Academico" },
              ]}
              errors={errors.anoFim}
              touched={touched.anoFim}
            />

            <Textarea
              label="Descricão"
              name="descricao"
              errors={errors.descricao}
              touched={touched.descricao}
            />

            <button type="submit" className={styles.button}>
              Salvar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CadastrarExperiencia;
