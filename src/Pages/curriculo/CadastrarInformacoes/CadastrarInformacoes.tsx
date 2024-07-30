import React, { useEffect, useState } from "react";

import Form from "../../../Components/forms/Form";

import * as Yup from "yup";

import styles from "./CadastrarInformacoes.module.css";
import Input from "../../../Components/forms/Input/Input";
import Textarea from "../../../Components/forms/Textarea/Textarea";
import {
  Informacoes,
  getInformacoes,
  createOrUpdateInformacoes,
  deleteInformacoes,
} from "../../../services/informacoesService";
import InformacoesCard from "./InformacoesCard/InformacoesCard";
import Button from "../../../Components/common/Button";
import Title from "../../../Components/common/Title";
const CadastrarInformacoes: React.FC = () => {
  const [informacoes, setInformacoes] = useState<Informacoes>({} as Informacoes);

  const initialValues: Informacoes = {
    id: 0,
    foto: "",
    nome: "",
    cargo: "",
    resumo: "",
  };
  const validationSchema = Yup.object().shape({
    foto: Yup.string().required("campo obrigatório"),
    nome: Yup.string().required("campo obrigatório"),
    cargo: Yup.string().required("campo obrigatório"),
    resumo: Yup.string().required("campo obrigatótório"),
  });
  const fetchInformacoes = async () => {
    try {
      const informacoes = await getInformacoes();
      setInformacoes(informacoes);
      console.log(informacoes);
    } catch (error) {
      console.error("Erro ao buscar informações:", error);
    }
  };
  useEffect(() => {
    fetchInformacoes();
  }, []);

  const onSubmit = async (
    values: Informacoes,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await createOrUpdateInformacoes(values);
      setInformacoes(values);
      console.log({ values });
      resetForm();
      alert("Formulário enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Erro ao enviar o formulário.Tente novamente. ");
    }
  };
  const handleDelete = async () => {
    try {
      await deleteInformacoes();
      setInformacoes(initialValues);
      alert("Formulário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o formulário:", error);
      alert("Erro ao excluir o formulário. Tente novamente. ");
    }
  };
  return (
    <div className={styles.formWrapper}>
      <Form
        initialValues={informacoes}
        enableReiniciar={true}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors }) => (
          <>
            <Title>Informações Pessoais</Title>

            <Input
              label="Nome"
              name="nome"
              errors={errors.nome}
              touched={touched.nome}
            />
            <Input
              label="Foto"
              name="foto"
              errors={errors.foto}
              touched={touched.foto}
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

            <Button type="submit">Salvar</Button>
          </>
        )}
      </Form>
      {informacoes && (
        <div className={styles.cardContainer}>
          <InformacoesCard informacao={informacoes} />

          <Button onClick={handleDelete} red>
            Deletar
          </Button>
        </div>
      )}
    </div>
  )
};
export default CadastrarInformacoes;
