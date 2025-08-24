import React from "react";
import Slider from "react-slick";
import { useListBanner } from "@libs/services/HomeService";
import  { Banner } from "@libs/services/HomeService";

interface ArrowProps {
  onClick?: () => void;
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="hidden md:flex -translate-y-6 translate-x-6 slick-arrow slick-prev"
    aria-label="Previous slide"
  >
    <img
      src="/icon/prev-arrow.png"
      alt="prev-arrow"
      loading="lazy"
      className="w-[50px] h-[50px]"
    />
  </button>
);

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="hidden md:flex -translate-y-6 -translate-x-6 slick-arrow slick-next"
    aria-label="Next slide"
  >
    <img
      src="/icon/next-arrow.png"
      alt="next-arrow"
      loading="lazy"
      className="w-[50px] h-[50px]"
    />
  </button>
);

export default function BannerComponent() {
  const { data, isLoading, isError } = useListBanner();

  if (isLoading) return <p>Loading banners...</p>;
  if (isError) return <p>Gagal memuat banners</p>;
  if (!data || !data.data || data.data.length === 0) return <p>Tidak ada banner</p>;

  const banners: Banner[] = data.data;

  const settings = {
    dotsClass: "dotGetArt",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section>
      <div className="carousel-hero max-w-7xl mx-auto lg:pt-30 pt-20 px-5">
        <div className="relative w-full h-auto">
          {banners.length > 1 ? (
            <Slider {...settings}>
              {banners.map((e, i) => (
                <div key={e.id ?? i} className="md:py-5 -mb-2">
                  <a
                    target="_blank"
                    href={e.redirect_to}
                    rel="noopener noreferrer"
                  >
                    <div className="relative">
                      <div className="hidden md:block w-full">
                        <img
                          src={e.image_url}
                          alt={e.title}
                          className="rounded-xl w-full h-full object-cover"
                        />
                      </div>
                      <div className="block md:hidden">
                        <img
                          src={e.image_url}
                          alt={e.title}
                          className="rounded-xl w-full h-[140px] object-cover"
                        />
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
          ) : (
            banners.map((e, i) => (
              <div key={e.id ?? i} className="md:px-5 md:py-5 -mb-2">
                <a
                  target="_blank"
                  href={e.redirect_to}
                  rel="noopener noreferrer"
                >
                  <div className="relative">
                    <div className="hidden md:block w-full">
                      <img
                        src={e.image_url}
                        alt={e.title}
                        className="rounded-xl w-full h-full object-cover"
                      />
                    </div>
                    <div className="block md:hidden">
                      <img
                        src={e.image_url}
                        alt={e.title}
                        className="rounded-xl w-full h-[140px] object-cover"
                      />
                    </div>
                  </div>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
