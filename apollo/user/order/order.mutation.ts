import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      _id
      orderNumber
      totalAmount
      totalAmountKRW
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
  }
`;

export const CANCEL_ORDER = gql`
  mutation CancelOrder($orderId: String!) {
    cancelOrder(orderId: $orderId) {
      _id
      orderStatus
    }
  }
`;
export const CONFIRM_PAYMENT = gql`
  mutation ConfirmPayment($input: ConfirmPaymentInput!) {
    confirmPayment(input: $input) {
      _id
      orderId
      paymentKey
      tossOrderId
      amount
      status
      method
      approvedAt
    }
  }
`;
