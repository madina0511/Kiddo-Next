import { userVar } from "@/apollo/store";
import { Comment } from "@/libs/types/comment/comment";
import { CommentGroup } from "@/libs/enums/comment.enum";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import StarIcon from "@mui/icons-material/Star";
import {
  CommentInput,
  CommentsInquiry,
} from "@/libs/types/comment/comment.input";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { GET_AGENTS, GET_COMMENTS, GET_PRODUCTS } from "@/apollo/user/query";
import {
  CREATE_COMMENT,
  LIKE_TARGET_PRODUCT,
  UPDATE_COMMENT,
} from "@/apollo/user/mutation";
import { Member } from "@/libs/types/member/member";
import { Product } from "@/libs/types/product/product";
import { ProductsInquiry } from "@/libs/types/product/product.input";
import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import ReviewCard from "@/libs/components/brands/ReviewCard";
import ProductCard from "@/libs/components/products/productCard";
import LayoutHome from "@/libs/components/layout/LayoutHome";
import {
  sweetErrorHandling,
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/types/sweetAlert";
import { NEXT_PUBLIC_API_URL } from "@/libs/config";
import { Direction, Message } from "@/libs/enums/common.enum";
import { T } from "@/libs/common";

const BrandPage = ({ initialInput, initialComment, ...props }: any) => {
  const device = useDeviceDetect();
  const router = useRouter();
  const user = useReactiveVar(userVar);

  // STATE
  const [agentId, setAgentId] = useState<string | null>(null);
  const [agent, setAgent] = useState<Member | null>(null);
  const [searchFilter, setSearchFilter] = useState<ProductsInquiry>({
    page: 1,
    limit: 9,
    sort: "createdAt",
    direction: Direction.DESC,
    search: { memberId: "" },
  });
  const [agentProducts, setAgentProducts] = useState<Product[]>([]);
  const [productTotal, setProductTotal] = useState<number>(0);
  const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(
    initialComment ?? {
      page: 1,
      limit: 5,
      sort: "createdAt",
      direction: "ASC",
      search: { commentRefId: "" },
    },
  );
  const [agentComments, setAgentComments] = useState<Comment[]>([]);
  const [commentTotal, setCommentTotal] = useState<number>(0);
  const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
    commentGroup: CommentGroup.MEMBER,
    commentContent: "",
    commentRefId: "",
  });

  // APOLLO
  const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);
  const [createComment] = useMutation(CREATE_COMMENT);
  const [updateComment] = useMutation(UPDATE_COMMENT);

  const { data: agentsData } = useQuery(GET_AGENTS, {
    skip: !agentId,
    variables: { input: { page: 1, limit: 1, search: { text: agentId } } },
    fetchPolicy: "network-only",
  });

  const { data: getProductsData, refetch: getProductsRefetch } = useQuery(
    GET_PRODUCTS,
    {
      skip: !agent?._id,
      variables: {
        input: { ...searchFilter, search: { memberId: agent?._id } },
      },
      fetchPolicy: "network-only",
    },
  );

  const { data: commentsData, refetch: getCommentsRefetch } = useQuery(
    GET_COMMENTS,
    {
      skip: !commentInquiry?.search?.commentRefId,
      variables: { input: commentInquiry },
      fetchPolicy: "cache-and-network",
    },
  );

  // LIFECYCLES
  useEffect(() => {
    if (router.query.slug) setAgentId(router.query.slug as string);
  }, [router.query.slug]);

  useEffect(() => {
    if (!agentsData) return;
    const foundAgent = agentsData?.getAgents?.list?.[0];
    if (!foundAgent) return;
    setAgent(foundAgent);
    setInsertCommentData((prev) => ({ ...prev, commentRefId: foundAgent._id }));
    setCommentInquiry((prev) => ({
      ...prev,
      search: { commentRefId: foundAgent._id },
    }));
  }, [agentsData]);

  useEffect(() => {
    if (!getProductsData) return;
    setAgentProducts(getProductsData?.getProducts?.list || []);
    setProductTotal(getProductsData?.getProducts?.metaCounter?.[0]?.total || 0);
  }, [getProductsData]);

  useEffect(() => {
    if (!commentsData) return;
    setAgentComments(commentsData?.getComments?.list || []);
    setCommentTotal(commentsData?.getComments?.metaCounter?.[0]?.total || 0);
  }, [commentsData]);

  // HANDLERS
  const likeProductHandler = async (user: T, productId: string) => {
    try {
      if (!productId) return;
      if (!user?._id) throw new Error(Message.NOT_AUTHENTICATED);

      await likeTargetProduct({
        variables: { input: productId },
      });

      await getProductsRefetch({
        input: searchFilter,
      });

      await sweetTopSmallSuccessAlert("success", 800);
    } catch (err: any) {
      sweetMixinErrorAlert(err.message).then();
    }
  };

  const createCommentHandler = async () => {
    try {
      if (!user?._id) throw new Error("Not authenticated");
      await createComment({ variables: { input: insertCommentData } });
      setInsertCommentData((prev) => ({ ...prev, commentContent: "" }));
      await getCommentsRefetch({ input: commentInquiry });
      await sweetTopSmallSuccessAlert("Success", 800);
    } catch (err: any) {
      sweetMixinErrorAlert(err.message);
    }
  };

  const deleteCommentHandler = async (commentId: string) => {
    try {
      await updateComment({
        variables: { input: { _id: commentId, commentStatus: "DELETE" } },
      });
      await getCommentsRefetch({ input: commentInquiry });
    } catch (err: any) {
      console.log("delete comment error:", err);
    }
  };

  const redirectToMemberPageHandler = async (memberId: string) => {
    try {
      if (memberId === user?._id)
        await router.push(`/mypage?memberId=${memberId}`);
      else await router.push(`/member?memberId=${memberId}`);
    } catch (error) {
      await sweetErrorHandling(error);
    }
  };

  const productPaginationChangeHandler = async (
    _: ChangeEvent<unknown>,
    value: number,
  ) => {
    setSearchFilter((prev) => ({ ...prev, page: value }));
  };

  const commentPaginationChangeHandler = async (
    _: ChangeEvent<unknown>,
    value: number,
  ) => {
    setCommentInquiry((prev) => ({ ...prev, page: value }));
  };

  if (device === "mobile") return <div>BRAND PAGE MOBILE</div>;

  return (
    <Stack className={"agent-detail-page"}>
      <Stack className={"container"}>
        {/* Agent info */}
        <Stack className={"agent-info"}>
          <img
            src={
              agent?.memberImage
                ? `${NEXT_PUBLIC_API_URL}/${agent?.memberImage}`
                : "/img/profile/defaultUser.svg"
            }
            alt=""
          />
          <Box
            component={"div"}
            className={"info"}
            onClick={() => redirectToMemberPageHandler(agent?._id as string)}>
            <strong>{agent?.memberFullName ?? agent?.memberNick}</strong>
          </Box>
        </Stack>

        {/* Products */}
        <Stack className={"agent-home-list"}>
          <Stack className={"card-wrap"}>
            {agentProducts.map((product: Product) => (
              <ProductCard
                key={product._id}
                product={product}
                likeProductHandler={likeProductHandler}
              />
            ))}
          </Stack>
          <Stack className={"pagination"}>
            {productTotal ? (
              <>
                <Stack className="pagination-box">
                  <Pagination
                    page={searchFilter.page}
                    count={Math.ceil(productTotal / searchFilter.limit) || 1}
                    onChange={productPaginationChangeHandler}
                    shape="circular"
                    color="primary"
                  />
                </Stack>
                <span>Total {productTotal} available</span>
              </>
            ) : (
              <div className={"no-data"}>
                <img src="/img/icons/icoAlert.svg" alt="" />
                <p>No products found!</p>
              </div>
            )}
          </Stack>
        </Stack>

        {/* Reviews */}
        <Stack className={"review-box"}>
          <Stack className={"main-intro"}>
            <span>Reviews</span>
            <p>we are glad to see you again</p>
          </Stack>
          {commentTotal !== 0 && (
            <Stack className={"review-wrap"}>
              <Box component={"div"} className={"title-box"}>
                <StarIcon />
                <span>
                  {commentTotal} review{commentTotal > 1 ? "s" : ""}
                </span>
              </Box>
              {agentComments?.map((comment: Comment) => (
                <ReviewCard
                  comment={comment}
                  key={comment?._id}
                  userId={userVar()?._id}
                  deleteCommentHandler={deleteCommentHandler}
                />
              ))}
              <Box component={"div"} className={"pagination-box"}>
                <Pagination
                  page={commentInquiry.page}
                  count={Math.ceil(commentTotal / commentInquiry.limit) || 1}
                  onChange={commentPaginationChangeHandler}
                  shape="circular"
                  color="primary"
                />
              </Box>
            </Stack>
          )}

          <Stack className={"leave-review-config"}>
            <Typography className={"main-title"}>Leave A Review</Typography>
            <Typography className={"review-title"}>Review</Typography>
            <textarea
              onChange={({ target: { value } }: any) =>
                setInsertCommentData({
                  ...insertCommentData,
                  commentContent: value,
                })
              }
              value={insertCommentData.commentContent}
            />
            <Box className={"submit-btn"} component={"div"}>
              <Button
                className={"submit-review"}
                disabled={insertCommentData.commentContent === "" || !user?._id}
                onClick={createCommentHandler}>
                <Typography className={"title"}>Submit</Typography>
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LayoutHome(BrandPage);
