import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";

import * as Yup from "yup";

import styles from "./CadastrarInformacoes.module.css";
import Input from "../../../Components/forms/Input/Input";
import Textarea from "../../../Components/forms/Textarea/Textarea";
import {
  Informacoes,
  updateInformacoes,
  getInformacoes,
} from "../../../services/informacoesService";
import InformacoesCard from "./InformacoesCard/InformacoesCard";
import Button from "../../../Components/common/Button";

const CadastrarInformacoes: React.FC = () => {
  const [informacoes, setInformacoes] = useState<Informacoes>(
    {} as Informacoes
  );

  const initialValues: Informacoes = {
    id: "",
    foto: "",
    nome: "",
    cargo: "",
    resumo: "",
  };

  const validationSchema = Yup.object().shape({
    foto: Yup.string().required("Este campo é obrigatório"),
    nome: Yup.string().required("Este campo é obrigatório"),
    cargo: Yup.string().required("Este campo é obrigatório"),
    resumo: Yup.string().required("Este campo é obrigatório"),
  });

  const fatchInformacoes = async () => {
    try {
      const informacao = await getInformacoes();
      setInformacoes(informacao);
    } catch (error) {
      console.error("Erro ao buscar informações:", error);
    }
  };

  useEffect(() => {
    fatchInformacoes();
  }, []);

  const onSubimit = async (
    values: Informacoes,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await updateInformacoes(values);
      setInformacoes(values);
      console.log(values);
      resetForm();
      alert("Formulario enviado com sucesso!");
    } catch (error) {
      console.log(error);
      console.error("error ao enviar o formulário:", error);
      alert("ocorreu um erro ao enviar o formulário. Tente novamente.");
    }
  };

  const handleDelete = async () => {
    try {
      await updateInformacoes(initialValues);
      setInformacoes(initialValues);
      alert("Informações deletadas com sucesso!");
    } catch (error) {
      console.error("Error ao deletar informações:", error);
      alert("ocorreu um erro ao deletar as informações. Tente novamente.");
    }
  };

  return (
    <div
      className={styles.formwrapper} 
    >
      <Formik
        initialValues={informacoes}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={onSubimit}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <h2 className={styles.title}> Cadastrar Imformações</h2>

            <Input
              label="Foto"
              name="foto"
              errors={errors.foto}
              touched={touched.foto}
            />

            <Input
              label="Nome"
              name="nome"
              errors={errors.nome}
              touched={touched.nome}
            />
            <Input
              label="Cargo"
              name="cargo"
              errors={errors.cargo}
              touched={touched.cargo}
            />

            <Textarea
              label="Resumo"
              name="resumo"
              errors={errors.resumo}
              touched={touched.resumo}
            />

            <button type="submit" className={styles.button}>Salvar</button>
          </Form>
        )}
      </Formik>

      {informacoes &&
        Object.entries(informacoes).some(
          ([key, value]) => key !== "id" && value.trim() !== ""
        ) && (
          <div className={styles.cardContainer}>
            <InformacoesCard informacao={informacoes} />
            <Button onClick={handleDelete} red>Deletar</Button>
          </div>
        )}
    </div>
  );
};
export default CadastrarInformacoes;
