import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import Home from '../Pages/home/';
import CadastrarInformacoes from '../Pages/curriculo/CadastrarInformacoes';
import CadastrarExperiencia from '../Pages/curriculo/CadastrarExperiencia';
import ListaExperiencia from '../Pages/curriculo/ListaExperiencia';
import ListaPortfolio from '../Pages/portfolio/ListaPortfolio';
import CadastrarPortfolio from '../Pages/portfolio/CadastrarPortfolio';

import Layout from '../Components/layout/';
import { useAuth } from "../contexts/AuthContexts";

const AppRoutes: React.FC = () => {
    const {authenticated, isLoading} = useAuth();

    if (isLoading) {
      return <h3>Carregando...</h3>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return (
      <Layout>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/curriculo/informacoes/cadastro" element={<CadastrarInformacoes/>} />
         <Route path="/curriculo/experiencia/cadastro" element={<CadastrarExperiencia/>} /> 
         <Route path="/curriculo/experiencia/lista" element={<ListaExperiencia/>} /> 
         <Route path="/portfolio/cadastro" element={<CadastrarPortfolio/>} />
         <Route path="/portfolio/lista" element={<ListaPortfolio/>} /> 
        </Routes>
      </Layout>
    );
};

export default AppRoutes;