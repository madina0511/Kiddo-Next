import { colorMap, T } from "@/libs/common";
import { Pagination as MuiPagination } from "@mui/material";
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
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import withLayoutBase from "@/libs/components/layout/LayoutBase";
import {
  CREATE_COMMENT,
  LIKE_TARGET_PRODUCT,
  UPDATE_COMMENT,
} from "@/apollo/user/mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COMMENTS, GET_PRODUCT, GET_PRODUCTS } from "@/apollo/user/query";
import { Product } from "@/libs/types/product/product";
import { Direction } from "@/libs/enums/common.enum";
import { NEXT_PUBLIC_API_URL } from "@/libs/config"; // ✅ import qo'shildi
import { userVar } from "@/apollo/store";

// ✅ defaultProps o'rniga to'g'ridan-to'g'ri initial value
const initialComment: CommentsInquiry = {
  page: 1,
  limit: 5,
  sort: "createdAt",
  direction: Direction.DESC,
  search: {
    commentRefId: "",
  },
};

const ProductDetail = () => {
  const router = useRouter();

  const [productId, setProductId] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // ✅ defaultProps o'rniga to'g'ridan-to'g'ri useState ga berildi
  const [commentInquiry, setCommentInquiry] =
    useState<CommentsInquiry>(initialComment);

  const [productComments, setProductComments] = useState<Comment[]>([]);
  const [commentTotal, setCommentTotal] = useState<number>(0);

  const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
    commentGroup: CommentGroup.PRODUCT,
    commentContent: "",
    commentRefId: "",
  });

  const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);
  const [createComment] = useMutation(CREATE_COMMENT);
  const [updateComment] = useMutation(UPDATE_COMMENT);

  useEffect(() => {
    const id = router.query.id as string | undefined;
    if (!id) return;
    setProductId(id);
  }, [router.query.id]);

  const { loading: getProductLoading, data: productData } = useQuery(
    GET_PRODUCT,
    {
      fetchPolicy: "network-only",
      variables: { input: productId },
      skip: !productId,
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => {
    const fetchedProduct = productData?.getProduct;
    if (!fetchedProduct) return;
    setSelectedProduct(fetchedProduct);
    setCommentInquiry((prev) => ({
      ...prev,
      search: { ...(prev.search ?? {}), commentRefId: fetchedProduct._id },
    }));
    setInsertCommentData((prev) => ({
      ...prev,
      commentRefId: fetchedProduct._id,
    }));
  }, [productData]);

  const { data: getProductsData, refetch: getProductsRefetch } = useQuery(
    GET_PRODUCTS,
    {
      fetchPolicy: "network-only",
      variables: {
        input: {
          page: 1,
          limit: 20,
          sort: "createdAt",
          direction: Direction.DESC,
          search: {},
        },
      },
      skip: !productId,
      notifyOnNetworkStatusChange: true,
    },
  );

  const { data: commentsData, refetch: getCommentsRefetch } = useQuery(
    GET_COMMENTS,
    {
      fetchPolicy: "cache-and-network",
      variables: { input: commentInquiry },
      skip: !commentInquiry?.search?.commentRefId,
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => {
    if (!commentsData) return;
    setProductComments(commentsData?.getComments?.list || []);
    setCommentTotal(commentsData?.getComments?.metaCounter?.[0]?.total ?? 0);
  }, [commentsData]);

  const products: Product[] = getProductsData?.getProducts?.list ?? [];

  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];

    return products
      .filter(
        (item: Product) =>
          item.brandName === selectedProduct.brandName &&
          item._id !== selectedProduct._id,
      )
      .slice(0, 6);
  }, [products, selectedProduct]);

  const likeProductHandler = async (user: any, id: string) => {
    try {
      await likeTargetProduct({
        variables: {
          input: id,
        },
      });

      await getProductsRefetch(); // ✅ shart olib tashlandi
    } catch (error) {
      console.log("like product error:", error);
    }
  };
  const deleteCommentHandler = async (commentId: string) => {
    try {
      await updateComment({
        variables: {
          input: {
            _id: commentId,
            commentStatus: "DELETE",
          },
        },
      });
      await getCommentsRefetch({ input: commentInquiry });
    } catch (err: any) {
      console.log("delete comment error:", err);
    }
  };
  const handleSizeChange = (event: SelectChangeEvent) => {
    setSelectedSize(event.target.value);
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value);
  };

  const commentPaginationChangeHandler = (
    event: ChangeEvent<unknown>,
    value: number,
  ) => {
    setCommentInquiry((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const createCommentHandler = async () => {
    try {
      await createComment({
        variables: {
          input: insertCommentData,
        },
      });
      console.log("COMMENT DATA:", insertCommentData);
      setInsertCommentData((prev) => ({
        ...prev,
        commentContent: "",
      }));

      await getCommentsRefetch({
        input: commentInquiry,
      });
    } catch (err: any) {
      console.log("create comment error:", err);
    }
  };

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

    setSelectedSize("");
    setSelectedColor("");
  };

  if (getProductLoading || !selectedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <Stack id="pc-wrap">
      <Stack className="container">
        <Box className="detail-wrap">
          <Box className="img-wrap">
            {selectedProduct.productImages?.map(
              (image: string, index: number) => (
                <img
                  key={index}
                  // ✅ NEXT_PUBLIC_API_URL qo'shildi
                  src={`${NEXT_PUBLIC_API_URL}/${image}`}
                  alt={`${selectedProduct.productTitle}-${index}`}
                />
              ),
            )}
          </Box>

          <Box className="info-wrap">
            <Stack className="info-box">
              <Typography className="title">
                {selectedProduct.productTitle}
              </Typography>

              <Typography className="desc">
                {selectedProduct.brandName}
              </Typography>

              <Typography className="desc">
                {selectedProduct.productDesc}
              </Typography>

              <Link href="/sizeGuide" className="desc" underline="hover">
                Size guide
              </Link>

              <Typography className="price">
                ${selectedProduct.productPrice}
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
                  {selectedProduct.size?.map((item: string) => (
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
                  value={selectedColor || ""}
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

                  {selectedProduct?.productColors?.map((item: string) => {
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
                <Typography className={"reviews"}>
                  {commentTotal} reviews
                </Typography>
              </Stack>
            </Stack>

            <Stack className={"review-list"}>
              {productComments.map((comment: Comment) => (
                <Review
                  comment={comment}
                  key={comment._id}
                  userId={userVar()?._id}
                  deleteCommentHandler={deleteCommentHandler}
                />
              ))}

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
              setInsertCommentData((prev) => ({
                ...prev,
                commentContent: value,
              }));
            }}
            value={insertCommentData.commentContent}
          />

          <Box className={"submit-btn"} component={"div"}>
            <Button
              onClick={createCommentHandler}
              className={"submit-review"}
              disabled={insertCommentData.commentContent === ""}>
              <Typography className={"title"}>Submit Review</Typography>
            </Button>
          </Box>
        </Stack>
      </Stack>

      <Box className="see-more-wrap">
        <Typography className="see-more-title">YOU MAY ALSO LIKE</Typography>
        <Typography className="see-more-brand">
          {selectedProduct.brandName}
        </Typography>

        <Box className="see-more-card">
          {relatedProducts.map((item: Product) => (
            <ProductCard
              key={item._id}
              product={item}
              likeProductHandler={likeProductHandler}
            />
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default withLayoutBase(ProductDetail);
