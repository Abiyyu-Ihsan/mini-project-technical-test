import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface ProductImage {
  image: string;
  alt_image: string;
}

export interface ProductUrl {
  shopee?: string;
  tokopedia?: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  name: string;
  slug: string;
  price: number;
  description: string;
  sold_count: number;
  rating: number;
  url: ProductUrl[]; // karena di response berupa array
  category: ProductCategory;
  images: ProductImage[];
  discount_in_percentage?: number;
  discounted_price?: number;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export const getProductBySlug = async (
  slug: string
): Promise<ApiResponse<Product>> => {
  const { data } = await axios.get<ApiResponse<Product>>(
    `${process.env.API_URL}/product/${slug}`
  );
  return data;
};


export const useProductBySlug = (slug: string) => {
  return useQuery<Product>({
    queryKey: ["product", slug],
    queryFn: async () => {
      const res = await getProductBySlug(slug);
      return res.data;
    },
    enabled: !!slug,
  });
};