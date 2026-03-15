import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

import { Stack } from "@mui/material";
import { useRef, useState } from "react";

const ProductSwiper = () => {
  const swiperRef = useRef<any>(null);
  const [products] = useState([
    { id: 1, name: "Kids T-shirt", price: "$20", link: "/product/1" },
    { id: 2, name: "Baby Jacket", price: "$35", link: "/product/2" },
    { id: 3, name: "Kids Jeans", price: "$40", link: "/product/3" },
    { id: 4, name: "Kids Hoodie", price: "$30", link: "/product/4" },
    { id: 5, name: "Kids Coat", price: "$45", link: "/product/5" },
    { id: 6, name: "Kids T-shirt", price: "$20", link: "/product/6" },
    { id: 7, name: "Baby Jacket", price: "$35", link: "/product/7" },
    { id: 8, name: "Kids Jeans", price: "$40", link: "/product/8" },
    { id: 9, name: "Kids Hoodie", price: "$30", link: "/product/9" },
    { id: 10, name: "Kids Coat", price: "$45", link: "/product/10" },
  ]);

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
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link href={product.link}>
              <div
                className="card"
                onMouseEnter={() => swiperRef.current?.autoplay.stop()}
                onMouseLeave={() => swiperRef.current?.autoplay.start()}>
                <img src="/img/banner/unity.jpg" alt={product.name} />
                <div className="text">
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

export default ProductSwiper;
