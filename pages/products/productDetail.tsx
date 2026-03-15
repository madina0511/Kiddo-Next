import { colorMap, products } from "@/libs/common";
import { Pagination as MuiPagination } from "@mui/material";
import LayoutHome from "@/libs/components/layout/LayoutHome";
import ProductCard from "@/libs/components/products/productCard";
import Review from "@/libs/components/products/Review";
import { Comment } from "@/libs/types/comment/comment";
import { CommentGroup } from "@/libs/enums/comment.enum";
import {
  CommentInput,
  CommentsInquiry,
} from "@/libs/types/comment/comment.input";
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
import { ChangeEvent, useEffect, useState } from "react";
import withLayoutBase from "@/libs/components/layout/LayoutBase";

const ProductDetail = ({ initialComment, ...props }: any) => {
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [commentInquiry, setCommentInquiry] =
    useState<CommentsInquiry>(initialComment);
  const [productComments, setProductComments] = useState<Comment[]>([]);
  const [commentTotal, setCommentTotal] = useState<number>(0);
  const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
    commentGroup: CommentGroup.PRODUCT,
    commentContent: "",
    commentRefId: "",
  });

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
  const commentPaginationChangeHandler = async (
    event: ChangeEvent<unknown>,
    value: number,
  ) => {
    commentInquiry.page = value;
    setCommentInquiry({ ...commentInquiry });
  };
  const createCommentHandler = async () => {
    console.log("done");
    /* try {
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

      await createComment({ variables: { input: insertCommentData } });

      setInsertCommentData({ ...insertCommentData, commentContent: "" });

      await getCommentsRefetch({ input: commentInquiry });
    } catch (err: any) {
      await sweetErrorHandling(err);
    } */
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

        {commentTotal !== 0 && (
          <Stack className={"reviews-config"}>
            <Stack className={"filter-box"}>
              <Stack className={"review-cnt"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none">
                  <g clipPath="url(#clip0_6507_7309)">
                    <path
                      d="M15.7183 4.60288C15.6171 4.3599 15.3413 4.18787 15.0162 4.16489L10.5822 3.8504L8.82988 0.64527C8.7005 0.409792 8.40612 0.257812 8.07846 0.257812C7.7508 0.257812 7.4563 0.409792 7.32774 0.64527L5.57541 3.8504L1.14072 4.16489C0.815641 4.18832 0.540363 4.36035 0.438643 4.60288C0.337508 4.84586 0.430908 5.11238 0.676772 5.28084L4.02851 7.57692L3.04025 10.9774C2.96794 11.2275 3.09216 11.486 3.35771 11.636C3.50045 11.717 3.66815 11.7575 3.83643 11.7575C3.98105 11.7575 4.12577 11.7274 4.25503 11.667L8.07846 9.88098L11.9012 11.667C12.1816 11.7979 12.5342 11.7859 12.7992 11.636C13.0648 11.486 13.189 11.2275 13.1167 10.9774L12.1284 7.57692L15.4801 5.28084C15.7259 5.11238 15.8194 4.84641 15.7183 4.60288Z"
                      fill="#181A20"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6507_7309">
                      <rect
                        width="15.36"
                        height="12"
                        fill="white"
                        transform="translate(0.398438)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <Typography className={"reviews"}>
                  {commentTotal} reviews
                </Typography>
              </Stack>
            </Stack>
            <Stack className={"review-list"}>
              {productComments?.map((comment: Comment) => {
                return <Review comment={comment} key={comment?._id} />;
              })}
              <Box component={"div"} className={"pagination-box"}>
                <MuiPagination
                  page={commentInquiry.page}
                  count={Math.ceil(commentTotal / commentInquiry.limit)}
                  onChange={commentPaginationChangeHandler}
                  shape="circular"
                  color="primary"
                />
              </Box>
            </Stack>
          </Stack>
        )}
        <Stack className={"leave-review-config"}>
          <Typography className={"main-title"}>Leave Your Opinion</Typography>
          <Typography className={"review-title"}>Opinion</Typography>
          <textarea
            onChange={({ target: { value } }: any) => {
              setInsertCommentData({
                ...insertCommentData,
                commentContent: value,
              });
            }}
            value={insertCommentData.commentContent}></textarea>
          <Box className={"submit-btn"} component={"div"}>
            <Button
              onClick={createCommentHandler}
              className={"submit-review"}
              disabled={
                insertCommentData.commentContent === "" //|| user?._id === ""
              }>
              <Typography className={"title"}>Submit Review</Typography>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none">
                <g clipPath="url(#clip0_6975_3642)">
                  <path
                    d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
                    fill="#181A20"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6975_3642">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0.601562 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </Box>
        </Stack>
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

ProductDetail.defaultProps = {
  initialComment: {
    page: 1,
    limit: 5,
    sort: "createdAt",
    direction: "DESC",
    search: {
      commentRefId: "",
    },
  },
};

export default withLayoutBase(ProductDetail);
