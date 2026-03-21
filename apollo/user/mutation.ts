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
