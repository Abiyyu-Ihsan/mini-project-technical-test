import Image from "next/image";
import React from "react";
import Slider, { Settings } from "react-slick";


interface ImageType {
  image: string;
  alt_image: string;
}

interface URLType {
  shopee: string;
}

interface ProductData {
  name: string;
  price: number;
  discounted_price: number;
  discount_in_percentage: number;
  sold_count: number;
  rating: number;
  images: ImageType[];
  url: URLType[];
}

interface ArrowProps {
  onClick?: () => void;
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <img
    onClick={onClick}
    src="/icons/prev-arrow.png"
    alt="prev-arrow"
    loading="lazy"
    aria-label="prev arrow"
    className="hidden md:flex -translate-y-6 z-20 translate-x-6 slick-arrow slick-prev cursor-pointer"
    style={{ width: "50px", height: "50px" }}
    aria-hidden="true"
  />
);

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <img
    onClick={onClick}
    src="/icons/next-arrow.png"
    alt="next-arrow"
    loading="lazy"
    aria-label="next-arrow"
    className="hidden md:flex -translate-y-6 -translate-x-6 slick-arrow slick-next cursor-pointer"
    style={{ width: "50px", height: "50px" }}
    aria-hidden="true"
  />
);

interface SectionHeadDetailProps {
  data: ProductData | any;
}

const SectionHeadProductDetailScreen: React.FC<SectionHeadDetailProps> = ({ data }) => {
  // Defensive programming: handle case when data is null/undefined
  if (!data) {
    return (
      <div className="max-w-7xl mx-auto md:pt-20 md:px-5">
        <div className="text-center py-10">
          <p className="text-gray-500">Data produk tidak tersedia</p>
        </div>
      </div>
    );
  }

  const formatIDR = (amount: number | null | undefined): string => {
    if (amount == null || isNaN(amount)) return "Rp 0";
    
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatSold = (sold_count: number | null | undefined): string => {
    if (sold_count == null || isNaN(sold_count)) return "0";

    let formatted = "";

    if (sold_count >= 1000000) {
      formatted = Math.floor(sold_count / 1000000) + "jt";
    } else if (sold_count >= 100000) {
      formatted = Math.floor(sold_count / 1000) + "rb";
    } else if (sold_count >= 10000) {
      formatted = Math.floor(sold_count / 1000) + "rb";
    } else if (sold_count >= 1000) {
      formatted =
        (sold_count / 1000)
          .toFixed(sold_count % 1000 === 0 ? 0 : 1)
          .replace(".", ",") + "rb";
    } else {
      formatted = sold_count.toString();
    }

    return sold_count > 100 ? formatted + "+" : formatted;
  };

  const formatRating = (rating: number | null | undefined): string => {
    if (rating == null || isNaN(rating)) return "0";
    return Math.min(Math.max(rating, 0), 5).toFixed(1);
  };

  const settings: Settings = {
    dotsClass: "dotGetArt",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Default values untuk mencegah error
  const images = data.images || [];
  const urls = data.url || [];
  const hasMultipleImages = images.length > 1;
  const defaultImage = "/images/placeholder-product.jpg"; 

  return (
    <div className="max-w-7xl mx-auto md:pt-20 md:px-5">
      <div className="md:flex">
        <div className="md:w-1/3 w-full group">
          {hasMultipleImages ? (
            <Slider {...settings}>
            {images.map((img: ImageType, index: number) => (
                <div key={index} className="relative group">
                  <Image
                    src={img.image || defaultImage}
                    alt={img.alt_image || `Product image ${index + 1}`}
                    className="md:mt-11 mt-9 md:rounded-md border"
                    width={800}
                    height={800}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = defaultImage;
                    }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="relative group w-full">
  <img
    src={images[0]?.image || defaultImage}
    alt={images[0]?.alt_image || "Product image"}
    className="w-full h-auto md:mt-11 mt-9 md:rounded-md border object-contain"
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.src = defaultImage;
    }}
  />
</div>
          )}
        </div>
        <div className="md:ml-[38px] md:w-[582px] p-3 md:p-0 md:mt-11">
          <h1 className="text-black md:text-lg text-sm font-semibold leading-4">
            {data.name || "Nama produk tidak tersedia"}
          </h1>
          <div className="flex md:mt-4 mt-2 items-center">
            <h1 className="text-[#E41A67] text-sm md:text-[32px] font-semibold leading-[38px]">
              {formatIDR(data.discounted_price)}
            </h1>
            {data.price !== data.discounted_price && (
              <>
                <p className="text-[#747474] text-sm line-through md:text-base font-medium leading-[19px] ml-3">
                  {formatIDR(data.price)}
                </p>
                {data.discount_in_percentage > 0 && (
                  <span className="bg-[#CFFAFF] rounded-[2px] p-[1px] text-[#046A7C] text-xs font-semibold leading-[13px] ml-[6px]">
                    {data.discount_in_percentage}%
                  </span>
                )}
              </>
            )}
          </div>
          <div className="flex md:mt-4 mt-2 items-center">
            <h1 className="text-black md:text-base text-sm font-normal leading-[19px]">
              Terjual{" "}
              <span className="text-[#747474] md:text-base text-sm font-normal leading-[19px]">
                {formatSold(data.sold_count)}
              </span>
            </h1>
            <img src="/icons/dot.svg" className="w-2 ml-3" alt="separator" />
            <img src="/icons/bintang.svg" className="ml-[6px] mr-[2px]" alt="star" />
            <p className="text-black md:text-base text-sm font-normal leading-[19px]">
              {formatRating(data.rating)}/5
            </p>
          </div>
          {urls.length > 0 && urls[0]?.shopee && (
            <a href={urls[0].shopee} target="_blank" rel="noopener noreferrer">
              <button className="flex bg-[#E41A67] rounded-[8px] md:py-3 md:px-4 p-2 md:mt-4 mt-2 hover:bg-[#c91557] transition-colors">
                <p className="text-white md:text-base text-sm font-semibold leading-[29px] md:mr-3 mr-1">
                  Pesan di Shopee
                </p>
                <img src="/icons/direct.svg" className="md:w-4 w-3" alt="external link" />
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionHeadProductDetailScreen;