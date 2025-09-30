import { useQuery } from "@tanstack/react-query";
import ApiClient, { type ResponseA } from "../services/api-client";
import useQueryStory from "./stores/useQueryStory";

interface City {
  id: number;
  name: string;
}
interface Airline {
  name: string;
}
export interface Flight {
  id: number;
  final_price: number;
  airline: Airline;
  city: City;
  city_to: City;
  date: string;
}
export interface QueryParams {
  // city__country?: number;
  to: boolean;
  city?: number;
  airline?: number;
  search?: string;
  ordering?: string;
  page?: number;
}
// useFlights.ts

// ... (imports e interfaces)

const useFlights = (newId: number) => {
  const query_params = useQueryStory((c) => c.query);
  const apiClient = new ApiClient<Flight>("fly/flights");

  // INÍCIO DA MUDANÇA
  // ----------------------------------------------------
  // Inclua newId e query_params (ou as partes relevantes) no queryKey.
  // Isso garante que a query seja refeita (e use a nova query_params) quando o estado mudar.
  return useQuery<ResponseA<Flight>>({
    queryFn: ({ pageParam = 0 }) => {
      console.log("Chamada à API. query_params.to é:", query_params.to); // Vai mostrar o valor atualizado!
      return apiClient.getAllSecond({
        params: query_params.to
          ? {
              ...query_params,
              city_to__country: newId,
              city__country: "",
              limit: 10,
              offset: pageParam * 10,
            }
          : {
              ...query_params,
              city_to__country: "",
              city__country: newId,
              limit: 10,
              offset: pageParam * 10,
            },
      });
    },
    // queryKey: ["flights"], // ANTES
    queryKey: ["flights", newId, query_params], // DEPOIS
    // ----------------------------------------------------
    // FIM DA MUDANÇA

    getNextPageParam: (lastPage, allPage) => {
      let count = 0;
      allPage.map((p) => (count = count + p.results.length));
      return count !== lastPage.count ? allPage.length : undefined;
    },
  });
};

export default useFlights;
