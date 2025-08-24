import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

// tipe data untuk item banner
export interface Banner {
    id: string;
    title: string;
    image_url: string;
    redirect_to: string;
}

// tipe data response API
export interface BannerResponse {
    status: number;
    message: string;
    data: Banner[];
}

const getListBanner = async (): Promise<BannerResponse> => {
    const response = await axios.get<BannerResponse>(
        `${process.env.API_URL}/masterdata?category=banner`,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );
    return response.data;
};

export const useListBanner = (): UseQueryResult<BannerResponse> => {
    return useQuery<BannerResponse>({
        queryKey: ["bannerList"],
        queryFn: getListBanner,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });
};
