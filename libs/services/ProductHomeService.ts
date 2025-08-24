import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  thumbnail?: string;
  price?: number;
}

const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get<{ data: Category[] }>(
    `${process.env.API_URL}/categories`
  );
  return res.data.data;
};

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });
};

const getProductByCategory = async (category: string): Promise<Product[]> => {
  const res = await axios.get<{ data: Product[] }>(
    `${process.env.API_URL}/category/${category}`
  );
  return res.data.data;
};

export const useProductsByCategory = (category: string) => {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => getProductByCategory(category),
    enabled: !!category, 
    staleTime: 1000 * 60 * 5,
  });
};

