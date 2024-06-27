import api from "./api";

export interface Portfolio {
  id: string;
  link: string;
  imagem: string;
  title: string;
}

export const createPortfolio = async (portfolio: Portfolio) => {
    portfolio.id = ((await getPortfolios()).length).toString();
    const response = await api.post("/portfolio", portfolio);
    return response.data;
  };
  
  export const getPortfolios = async () => {
    const response = await api.get<Portfolio[]>("/portfolio");
    return response.data;
  };
  
  export const getPortfolioById = async (id: number) => {
    const response = await api.get(`/portfolio/${id}`);
    return response.data;
  }; 
  
  export const updatePortfolio = async (portfolio: Portfolio) => {
    const response = await api.put(`/portfolio/${portfolio.id}`, portfolio);
    console.log(response.data);
    return response.data;
  };
  
  export const deletePortfolio = async (portfolio: Portfolio ) => {
    const response = await api.delete<Portfolio>(`/portfolio/${portfolio.id}`);
    return response.data;
  };  
  
  export const createOrUpdatePortfolio = async (portfolio: Portfolio) => {
    if (portfolio.id === "" || portfolio.id === undefined) {  
      return await createPortfolio(portfolio);
    } else {
      return await updatePortfolio(portfolio);
    };
  };