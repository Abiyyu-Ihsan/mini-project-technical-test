import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${process.env.API_URL}/categories`);
  return res.data.data; 
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"], 
    queryFn: fetchCategories, 
    staleTime: 1000 * 60 * 5, 
  });
};
