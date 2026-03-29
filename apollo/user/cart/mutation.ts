import { gql } from "@apollo/client";

// export const ADD_TO_CART = gql`
//   mutation AddToCart($input: CartItemInput!) {
//     addToCart(input: $input) {
//       _id
//       memberId
//       totalAmount
//       createdAt
//       updatedAt
//       items {
//         _id
//         productId
//         productTitle
//         productPrice
//         productImages
//         size
//         quantity
//       }
//     }
//   }
// `;
export const ADD_TO_CART = gql`
  mutation AddToCart($input: CartItemInput!) {
    addToCart(input: $input) {
      _id
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
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
export const REMOVE_CART_ITEM = gql`
  mutation RemoveFromCart($input: RemoveCartItemInput!) {
    removeFromCart(input: $input) {
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
