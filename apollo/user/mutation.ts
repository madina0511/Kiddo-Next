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
    }
  }
`;
