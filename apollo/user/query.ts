import { gql } from "@apollo/client";

export const GET_AGENT_PRODUCTS = gql`
  query GetAgentProducts($input: AgentProductsInquiry!) {
    getAgentProducts(input: $input) {
      list {
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
      metaCounter {
        total
      }
    }
  }
`;
