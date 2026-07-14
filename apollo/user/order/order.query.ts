import { gql } from "@apollo/client";

export const GET_MY_ORDERS = gql`
  query GetMyOrders($input: OrdersInquiry!) {
    getMyOrders(input: $input) {
      list {
        _id
        orderNumber
        totalAmount
        orderStatus
        address {
          recipientName
          phone
          zipCode
          address
          addressDetail
          deliveryNote
        }
        items {
          productId
          productName
          productImages
          quantity
          price
        }
        createdAt
      }
      metaCounter {
        total
      }
    }
  }
`;
