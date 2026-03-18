import React, { useState } from "react";
import {
  Stack,
  Typography,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";
import { OrderStatus } from "@/libs/enums/myorders";
import { Order } from "@/libs/types/myorders/order";

const statusColor: Record<
  OrderStatus,
  "default" | "warning" | "info" | "success" | "error" | "primary"
> = {
  [OrderStatus.PENDING]: "warning",
  [OrderStatus.CONFIRMED]: "info",
  [OrderStatus.SHIPPED]: "primary",
  [OrderStatus.DELIVERED]: "success",
  [OrderStatus.CANCELLED]: "error",
};

// mock data - Apollo query bilan almashtiring
const mockOrders: Order[] = [
  {
    _id: "1",
    orderNumber: "ORD-20240001",
    items: [
      {
        productId: "p1",
        productName: "Kids Winter Jacket",
        productImage: "/img/products/default.svg",
        quantity: 2,
        price: 45000,
      },
    ],
    totalAmount: 90000,
    orderStatus: OrderStatus.DELIVERED,
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-05"),
  },
  {
    _id: "2",
    orderNumber: "ORD-20240002",
    items: [
      {
        productId: "p2",
        productName: "Baby Shoes",
        productImage: "/img/products/default.svg",
        quantity: 1,
        price: 25000,
      },
      {
        productId: "p3",
        productName: "Kids T-Shirt",
        productImage: "/img/products/default.svg",
        quantity: 3,
        price: 12000,
      },
    ],
    totalAmount: 61000,
    orderStatus: OrderStatus.SHIPPED,
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-12"),
  },
  {
    _id: "3",
    orderNumber: "ORD-20240003",
    items: [
      {
        productId: "p4",
        productName: "Kiddo Backpack",
        productImage: "/img/products/default.svg",
        quantity: 1,
        price: 35000,
      },
    ],
    totalAmount: 35000,
    orderStatus: OrderStatus.PENDING,
    createdAt: new Date("2025-01-03"),
    updatedAt: new Date("2025-01-03"),
  },
];

const LIMIT = 5;

const MyOrders = () => {
  const user = useReactiveVar(userVar);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [page, setPage] = useState(1);

  const filtered =
    statusFilter === "ALL"
      ? mockOrders
      : mockOrders.filter((o) => o.orderStatus === statusFilter);

  const paginated = filtered.slice((page - 1) * LIMIT, page * LIMIT);
  const total = filtered.length;

  return (
    <div id="my-orders-page">
      <Stack className="main-title-box">
        <Stack className="right-box">
          <Typography className="main-title">My Orders</Typography>
          <Typography className="sub-title">
            Track and manage your orders
          </Typography>
        </Stack>
      </Stack>

      {/* Filter */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2, mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {total} order{total !== 1 ? "s" : ""} found
        </Typography>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as OrderStatus | "ALL");
              setPage(1);
            }}
            sx={{ borderRadius: "8px", fontSize: "0.85rem" }}>
            <MenuItem value="ALL">All Orders</MenuItem>
            {Object.values(OrderStatus).map((s) => (
              <MenuItem key={s} value={s}>
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Table */}
      <TableContainer
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          background: "#fff",
        }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#fafafa" }}>
              <TableCell sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
                Order #
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
                Products
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
                Total
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Box>
                    <img src="/img/icons/icoAlert.svg" alt="" />
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      No orders found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((order) => (
                <TableRow
                  key={order._id}
                  hover
                  sx={{ "&:last-child td": { border: 0 } }}>
                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ color: "#111" }}>
                      {order.orderNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      {order.items.map((item) => (
                        <Stack
                          key={item.productId}
                          direction="row"
                          alignItems="center"
                          spacing={1}>
                          <Box
                            component="img"
                            src={item.productImage}
                            alt={item.productName}
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "6px",
                              objectFit: "cover",
                              border: "1px solid #eee",
                            }}
                            onError={(e: any) => {
                              e.target.src = "/img/profile/defaultUser.svg";
                            }}
                          />
                          <Typography variant="caption">
                            {item.productName}{" "}
                            <span style={{ color: "#888" }}>
                              x{item.quantity}
                            </span>
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {order.totalAmount.toLocaleString()} won
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        order.orderStatus.charAt(0) +
                        order.orderStatus.slice(1).toLowerCase()
                      }
                      color={statusColor[order.orderStatus]}
                      size="small"
                      sx={{ fontWeight: 600, fontSize: "0.72rem" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {total > LIMIT && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 3 }}>
          <Pagination
            count={Math.ceil(total / LIMIT)}
            page={page}
            shape="circular"
            color="primary"
            onChange={(_, value) => setPage(value)}
          />
        </Stack>
      )}
    </div>
  );
};

export default MyOrders;
