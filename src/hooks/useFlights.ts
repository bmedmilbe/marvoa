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

const useFlights = (newId: number) => {
  const query_params = useQueryStory((c) => c.query);
  const apiClient = new ApiClient<Flight>("fly/flights");
  // console.log()
  return useQuery<ResponseA<Flight>>({
    queryFn: ({ pageParam = 0 }) => {
      console.log(query_params.to);
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
    queryKey: ["flights"],
    getNextPageParam: (lastPage, allPage) => {
      // return 3;
      // console.log(allPage.length % 10);
      //check if no next page in last page
      // console.log(lastPage);
      // return 1;
      let count = 0;
      allPage.map((p) => (count = count + p.results.length));
      return count != lastPage.count ? allPage.length : undefined;
    },
  });
};

export default useFlights;
