import { gql } from "@apollo/client";

/**************************
 *         MEMBER         *
 *************************/

export const SIGN_UP = gql`
  mutation Signup($input: MemberInput!) {
    signup(input: $input) {
      _id
      memberType
      memberStatus
      memberPhone
      memberNick
      memberFullName
      memberImage
      memberAddress
      memberDesc
      memberProducts
      memberArticles
      memberFollowers
      memberFollowings
      memberLikes
      memberPoints
      memberViews
      memberComments
      memberRank
      memberWarnings
      memberBlocks
      createdAt
      deletedAt
      accessToken
      memberAuthType
      brandName
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      _id
      memberType
      memberStatus
      brandName
      memberAuthType
      memberPhone
      memberNick
      memberFullName
      memberImage
      memberAddress
      memberDesc
      memberProducts
      memberArticles
      memberFollowers
      memberFollowings
      memberLikes
      memberPoints
      memberViews
      memberComments
      memberRank
      memberWarnings
      memberBlocks
      createdAt
      deletedAt
      updatedAt
      accessToken
    }
  }
`;
export const UPDATE_MEMBER = gql`
  mutation UpdateMember($input: MemberUpdate!) {
    updateMember(input: $input) {
      _id
      memberType
      memberStatus
      brandName
      memberAuthType
      memberPhone
      memberNick
      memberFullName
      memberImage
      memberAddress
      memberDesc
      memberProducts
      memberArticles
      memberFollowers
      memberFollowings
      memberLikes
      memberPoints
      memberViews
      memberComments
      memberRank
      memberWarnings
      memberBlocks
      createdAt
      deletedAt
      updatedAt
      accessToken
    }
  }
`;

export const LIKE_TARGET_MEMBER = gql`
  mutation LikeTargetMember($input: String!) {
    likeTargetMember(memberId: $input) {
      _id
      memberType
      memberStatus
      brandName
      memberAuthType
      memberPhone
      memberNick
      memberFullName
      memberImage
      memberAddress
      memberDesc
      memberProducts
      memberArticles
      memberFollowers
      memberFollowings
      memberLikes
      memberPoints
      memberViews
      memberComments
      memberRank
      memberWarnings
      memberBlocks
      createdAt
      deletedAt
      updatedAt
      accessToken
    }
  }
`;

export const UPDATE_MEMBER_BY_ADMIN = gql`
  mutation UpdateMemberByAdmin($input: MemberUpdate!) {
    updateMemberByAdmin(input: $input) {
      _id
      memberType
      memberStatus
      brandName
      memberAuthType
      memberPhone
      memberNick
      memberFullName
      memberImage
      memberAddress
      memberDesc
      memberProducts
      memberArticles
      memberFollowers
      memberFollowings
      memberLikes
      memberPoints
      memberViews
      memberComments
      memberRank
      memberWarnings
      memberBlocks
      createdAt
      deletedAt
      updatedAt
      accessToken
    }
  }
`;

/**************************
 *        PRODUCT       *
 *************************/
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      _id
      productType
      productStatus
      productCategory
      size
      setItems
      productTitle
      productPrice
      gender
      productDiscount
      productViews
      productLikes
      productComments
      productRank
      productImages
      productDesc
      memberId
      soldAt
      deletedAt
      constructedAt
      createdAt
      updatedAt
      productColors
      ageGroup
      brandName
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: ProductUpdate!) {
    updateProduct(input: $input) {
      _id
      productType
      productStatus
      productCategory
      size
      setItems
      productTitle
      productPrice
      gender
      productDiscount
      productViews
      productLikes
      productComments
      productRank
      productImages
      productDesc
      memberId
      soldAt
      deletedAt
      constructedAt
      createdAt
      updatedAt
      productColors
      ageGroup
      brandName
    }
  }
`;
export const LIKE_TARGET_PRODUCT = gql`
  mutation LikeTargetProduct($input: String!) {
    likeTargetProduct(productId: $input) {
      _id
      productType
      productStatus
      productCategory
      size
      setItems
      productTitle
      productPrice
      gender
      productDiscount
      productViews
      productLikes
      productComments
      productRank
      productImages
      productDesc
      memberId
      soldAt
      deletedAt
      constructedAt
      createdAt
      updatedAt
      productColors
      ageGroup
      brandName
      memberData {
        _id
        memberType
        memberStatus
        brandName
        memberAuthType
        memberPhone
        memberNick
        agentCode
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberProducts
        memberArticles
        memberFollowers
        memberFollowings
        memberLikes
        memberPoints
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        createdAt
        deletedAt
        updatedAt
        accessToken
      }
      meLiked {
        memberId
        likeRefId
        myFavorite
      }
    }
  }
`;

export const UPDATE_PRODUCT_BY_ADMIN = gql`
  mutation UpdateProductByAdmin($input: ProductUpdate!) {
    updateProductByAdmin(input: $input) {
      _id
      productType
      productStatus
      productCategory
      size
      setItems
      productTitle
      productPrice
      gender
      productDiscount
      productViews
      productLikes
      productComments
      productRank
      productImages
      productDesc
      memberId
      soldAt
      deletedAt
      constructedAt
      createdAt
      updatedAt
      productColors
      ageGroup
      brandName
    }
  }
`;

export const REMOVE_PRODUCT_BY_ADMIN = gql`
  mutation RemoveProductByAdmin($input: String!) {
    removeProductByAdmin(productId: $input) {
      _id
      productType
      productStatus
      productCategory
      size
      setItems
      productTitle
      productPrice
      gender
      productDiscount
      productViews
      productLikes
      productComments
      productRank
      productImages
      productDesc
      memberId
      soldAt
      deletedAt
      constructedAt
      createdAt
      updatedAt
      productColors
      ageGroup
      brandName
    }
  }
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const CREATE_BOARD_ARTICLE = gql`
  mutation CreateBoardArticle($input: BoardArticleInput!) {
    createBoardArticle(input: $input) {
      _id
      articleCategory
      articleStatus
      articleTitle
      articleContent
      articleImage
      articleViews
      articleLikes
      memberId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BOARD_ARTICLE = gql`
  mutation UpdateBoardArticle($input: BoardArticleUpdate!) {
    updateBoardArticle(input: $input) {
      _id
      articleCategory
      articleStatus
      articleTitle
      articleContent
      articleImage
      articleViews
      articleLikes
      memberId
      createdAt
      updatedAt
    }
  }
`;

export const LIKE_TARGET_BOARD_ARTICLE = gql`
  mutation LikeTargetBoardArticle($input: String!) {
    likeTargetBoardArticle(articleId: $input) {
      _id
      articleCategory
      articleStatus
      articleTitle
      articleContent
      articleImage
      articleViews
      articleLikes
      memberId
      createdAt
      updatedAt
    }
  }
`;

/**************************
 *         COMMENT        *
 *************************/

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CommentInput!) {
    createComment(input: $input) {
      _id
      commentStatus
      commentGroup
      commentContent
      commentRefId
      memberId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($input: CommentUpdate!) {
    updateComment(input: $input) {
      _id
      commentStatus
      commentGroup
      commentContent
      commentRefId
      memberId
      createdAt
      updatedAt
    }
  }
`;

/**************************
 *         FOLLOW        *
 *************************/

export const SUBSCRIBE = gql`
  mutation Subscribe($input: String!) {
    subscribe(input: $input) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

export const UNSUBSCRIBE = gql`
  mutation Unsubscribe($input: String!) {
    unsubscribe(input: $input) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;
