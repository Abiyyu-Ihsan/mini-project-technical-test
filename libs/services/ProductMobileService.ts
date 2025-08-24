"use client";

import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  per_page: number;
  meta: any;
}

export async function getProductsFilter(
  params: Record<string, any> = {}
): Promise<AxiosResponse<ProductsResponse>> {
  try {
    const response = await axios.get<ProductsResponse>(
      `${process.env.API_URL}/products`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params,
      }
    );
    return response;
  } catch (error: any) {
    console.error("Error fetching product list:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch products");
  }
}

export function useProductsFilter(params: Record<string, any> = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProductsFilter(params),
    select: (response) => response.data, 
  });
}
