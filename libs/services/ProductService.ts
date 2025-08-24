import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// Types
export interface Product {
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  sold_count: number;
  rating: number;
  discount_in_percentage?: number;
  discounted_price?: number;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    current_page: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
}

export interface ProductsFilterParams {
  size?: string;
  discount?: string;
  search?: string;
  last_added?: string | any;
  thumbnail?: string;
  sort_by?: string;
  highest_price?: string;
  category_slug?: string[];
  lowest_price?: string;
  page?: number;
  categories?: string[];
  rating_above_4?: string;
  price_filter?: string;
}

export async function getProductsFilter(params: ProductsFilterParams = {}): Promise<ProductsResponse> {
  try {
    const url = `${process.env.API_URL}/products`;
    const response = await axios.get<ProductsResponse>(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
   
    throw new Error('Network error occurred');
  }
}


export function useProductsFilter(params: ProductsFilterParams = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProductsFilter(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, 
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('Request failed: 4')) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false, 
    enabled: true,
  });
}