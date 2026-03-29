import { gql } from "@apollo/client";

export const GET_MY_CART = gql`
  query GetMyCart {
    getMyCart {
      _id
      memberId
      items {
        _id
        productId
        productTitle
        productPrice
        productImages
        size
        quantity
      }
      totalAmount
      createdAt
      updatedAt
    }
  }
`;
