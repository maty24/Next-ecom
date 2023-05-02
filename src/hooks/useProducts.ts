import useSWR, { SWRConfiguration } from "swr";
import { IProduct } from "../../interfaces/products";

//esta funcion es para que swr sepa que hacer con los datos que recibe
//const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  //como tengo el fetcher global no hace falta ponerlo aqui
  const { data, error } = useSWR<IProduct[]>(`/api/${url}`, config);

  return {
    //si no hay data que devuelva un array vacio
    product: data || [],
    //esto es para saber si esta cargando o no error y data son falsos
    isLoading: !error && !data,
    isError: error,
  };
};
