import api from "./api";

export interface Experiencia {
  id: string;
  titulo: string;
  descricao: string;
  tipo: string;
  anoInicio: string;
  anoFim: string;
}

export const createExperiencia = async (experiencia: Experiencia) => {
  experiencia.id = (await getExperiencias()).length.toString();
  const response = await api.post("/experiencias", experiencia);
  return response.data;
};

export const getExperiencias = async () => {
  const response = await api.get("/experiencias");
  return response.data;
};

export const getExperienciaById = async (id: number) => {
  const response = await api.get(`/experiencias/${id}`);
  return response.data;
}; 

export const updateExperiencia = async (experiencia: Experiencia) => {
  const response = await api.put(`/experiencias/${experiencia.id}`, experiencia);
  return response.data;
};

export const deleteExperiencia = async (id: string) => {
  const response = await api.delete(`/experiencias/${id}`);
  return response.data;
};  
export const getExperienciaByTipo = async (tipo: string) : Promise<Experiencia[]> => {
  const response = await api.get<Experiencia[]>(`/experiencias?tipo=${tipo}`);
  return response.data;
};

export const createOrUpdateExperiencia = async (getExperiencia: Experiencia) => {
  if (getExperiencia.id === "") {  
    return await createExperiencia(getExperiencia);
  } else {
    return await updateExperiencia(getExperiencia);
  };
};
