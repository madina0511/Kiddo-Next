import { colorMap, products } from "@/libs/common";
import LayoutHome from "@/libs/components/layout/LayoutHome";
import ProductCard from "@/libs/components/products/productCard";
import {
  Box,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  //Handler
  const likeProductHandler = (productId: string) => {
    console.log("Liked product:", productId);
  };
  const handleSizeChange = (event: SelectChangeEvent) => {
    setSelectedSize(event.target.value);
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value);
  };

  useEffect(() => {
    const id = router.query.id as string | undefined;
    if (!id) return;

    const foundProduct = products.find((item: any) => item._id === id);
    setSelectedProduct(foundProduct || null);

    if (foundProduct?.size?.length) {
      setSelectedSize(foundProduct.size[0]);
    }

    if (foundProduct?.productColor?.length) {
      setSelectedColor(foundProduct.productColor[0]);
    }
  }, [router.query.id]);

  const addToCartHandler = () => {
    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    const payload = {
      productId: selectedProduct?._id,
      size: selectedSize,
      color: selectedColor,
      qty: 1,
    };

    console.log("ADD TO CART:", payload);

    // bu yerda backendga yuborasiz

    // reset
    setSelectedSize("");
    setSelectedColor("");
  };

  return (
    <Stack id="pc-wrap">
      <Stack className="container">
        <Box className="detail-wrap">
          <Box className="img-wrap">
            {selectedProduct?.productImages?.map(
              (image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedProduct?.productTitle}-${index}`}
                />
              ),
            )}
          </Box>

          <Box className="info-wrap">
            <Stack className="info-box">
              <Typography className="title">
                {selectedProduct?.productTitle || "Title"}
              </Typography>

              <Typography className="desc">
                {selectedProduct?.brandName || "Brand"}
              </Typography>

              <Typography className="desc">
                {selectedProduct?.productDesc || "description"}
              </Typography>

              <Link href="/sizeGuide" className="desc" underline="hover">
                Size guide
              </Link>

              <Typography className="price">
                ${selectedProduct?.productPrice || 0}
              </Typography>
            </Stack>

            <Stack className="select-box">
              <FormControl fullWidth>
                <InputLabel id="product-size-label">Size</InputLabel>
                <Select
                  labelId="product-size-label"
                  value={selectedSize}
                  onChange={handleSizeChange}
                  label="Size">
                  {selectedProduct?.size?.map((item: string) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="product-color-label">Color</InputLabel>
                <Select
                  labelId="product-color-label"
                  value={selectedColor}
                  onChange={handleColorChange}
                  label="Color"
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#888" }}>Color</span>;
                    }

                    const colorCode = colorMap[String(selected)] || "#ddd";

                    return (
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          backgroundColor: colorCode,
                          border:
                            colorCode === "#ffffff" ? "1px solid #ccc" : "none",
                        }}
                      />
                    );
                  }}>
                  <MenuItem value="">
                    <em>Color</em>
                  </MenuItem>
                  {selectedProduct?.productColor?.map((item: string) => {
                    const colorCode = colorMap[item] || "#ddd";

                    return (
                      <MenuItem key={item} value={item}>
                        <Box
                          sx={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            backgroundColor: colorCode,
                            border:
                              colorCode === "#ffffff"
                                ? "1px solid #ccc"
                                : "none",
                          }}
                        />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Stack>
            <Button
              variant="contained"
              className="cart-btn"
              onClick={addToCartHandler}>
              Add to cart
            </Button>

            <Stack className="selected-info">
              <Typography>
                Selected Size: <strong>{selectedSize || "-"}</strong>
              </Typography>
              <Typography>
                Selected Color: <strong>{selectedColor || "-"}</strong>
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Box className="comment-wrap"></Box>
      </Stack>
      <Box className="see-more-wrap">
        <Typography className="see-more-title">YOU MAY ASLO LIKE</Typography>
        <Typography className="see-more-brand">
          {selectedProduct?.brandName}
        </Typography>
        <Box className="see-more-card">
          {products
            .filter(
              (item) =>
                item.brandName === selectedProduct?.brandName &&
                item._id !== selectedProduct?._id,
            )
            .slice(0, 6)
            .map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                likeProductHandler={likeProductHandler}
              />
            ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default LayoutHome(ProductDetail);
