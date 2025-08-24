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
    className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 slick-arrow slick-prev cursor-pointer"
    style={{ width: "40px", height: "40px" }}
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
    className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 slick-arrow slick-next cursor-pointer"
    style={{ width: "40px", height: "40px" }}
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
      <div className="max-w-7xl mx-auto px-4 py-6 md:pt-20 md:px-5">
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
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        }
      }
    ]
  };

  // Default values untuk mencegah error
  const images = data.images || [];
  const urls = data.url || [];
  const hasMultipleImages = images.length > 1;
  const defaultImage = "/images/placeholder-product.jpg"; 

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-20 md:pt-32 md:px-5">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Image Section */}
        <div className="w-full max-w-sm mx-auto md:max-w-none md:mx-0 md:w-1/3 lg:w-2/5">
          {hasMultipleImages ? (
            <div className="relative">
              <Slider {...settings}>
                {images.map((img: ImageType, index: number) => (
                  <div key={index} className="relative">
                    <div className="aspect-square w-full max-h-80 md:max-h-none overflow-hidden rounded-lg border">
                      <Image
                        src={img.image || defaultImage}
                        alt={img.alt_image || `Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={600}
                        height={600}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = defaultImage;
                        }}
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="relative w-full">
              <div className="aspect-square w-full max-h-80 md:max-h-none overflow-hidden rounded-lg border">
                <img
                  src={images[0]?.image || defaultImage}
                  alt={images[0]?.alt_image || "Product image"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = defaultImage;
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-2/3 lg:w-3/5">
          <h1 className="text-black text-lg md:text-xl lg:text-2xl font-semibold leading-tight mb-3 md:mb-4">
            {data.name || "Nama produk tidak tersedia"}
          </h1>

          {/* Price Section */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <h2 className="text-[#E41A67] text-xl md:text-2xl lg:text-3xl font-semibold">
              {formatIDR(data.discounted_price)}
            </h2>
            {data.price !== data.discounted_price && (
              <>
                <p className="text-[#747474] text-sm md:text-base line-through font-medium">
                  {formatIDR(data.price)}
                </p>
                {data.discount_in_percentage > 0 && (
                  <span className="bg-[#CFFAFF] rounded px-2 py-1 text-[#046A7C] text-xs font-semibold">
                    {data.discount_in_percentage}%
                  </span>
                )}
              </>
            )}
          </div>

          {/* Stats Section */}
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="flex items-center gap-1">
              <span className="text-black text-sm md:text-base font-normal">
                Terjual
              </span>
              <span className="text-[#747474] text-sm md:text-base font-normal">
                {formatSold(data.sold_count)}
              </span>
            </div>
            
            <div className="w-1 h-1 bg-[#747474] rounded-full"></div>
            
            <div className="flex items-center gap-1">
              <img src="/icons/bintang.svg" className="w-4 h-4" alt="star" />
              <span className="text-black text-sm md:text-base font-normal">
                {formatRating(data.rating)}/5
              </span>
            </div>
          </div>

          {/* CTA Button */}
          {urls.length > 0 && urls[0]?.shopee && (
            <div className="mt-4 md:mt-6">
              <a href={urls[0].shopee} target="_blank" rel="noopener noreferrer">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#E41A67] rounded-lg px-6 py-3 md:py-4 hover:bg-[#c91557] transition-colors">
                  <span className="text-white text-sm md:text-base font-semibold">
                    Pesan di Shopee
                  </span>
                  <img src="/icons/direct.svg" className="w-4 h-4" alt="external link" />
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionHeadProductDetailScreen;