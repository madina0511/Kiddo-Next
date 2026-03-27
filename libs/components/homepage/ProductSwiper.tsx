import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

import { Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { GET_PRODUCTS } from "@/apollo/user/query";
import { useQuery } from "@apollo/client";
import { Product } from "@/libs/types/product/product";
import { useRouter } from "next/router";
import { ProductType } from "@/libs/enums/product.enum";
import { NEXT_PUBLIC_API_URL } from "@/libs/config";

const ProductSwiper = () => {
  const swiperRef = useRef<any>(null);
  const router = useRouter();
  const [sets, setSets] = useState<Product[]>([]);

  const { data } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only",
    variables: {
      input: {
        page: 1,
        limit: 10,
        sort: "createdAt",
        direction: "DESC",
        search: { productType: [ProductType.SET] },
      },
    },
  });

  useEffect(() => {
    if (!data) return;
    setSets(data?.getProducts?.list || []);
  }, [data]);

  return (
    <Stack className="product-wrap">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={4}
        navigation
        loop
        speed={4000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}>
        {sets.map((set) => (
          <SwiperSlide key={set._id}>
            <div
              className="card"
              onClick={() => router.push(`/sets/${set._id}`)}
              onMouseEnter={() => swiperRef.current?.autoplay.stop()}
              onMouseLeave={() => swiperRef.current?.autoplay.start()}
              style={{ cursor: "pointer" }}>
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/${set.productImages?.[0]}`}
                alt={set.productTitle}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/img/banner/joinbaby.webp";
                }}
              />
              <div className="text">
                <h3>{set.productTitle}</h3>
                <p>${set.productPrice}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

export default ProductSwiper;
