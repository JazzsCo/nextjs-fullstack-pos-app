import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { Box, Paper, Typography } from "@mui/material";
import { OrderContext } from "@/contexts/OrderContext";

const ActiveOrder = () => {
  const router = useRouter();
  const query = router.query;

  const orderId = router.query.id as string;

  const { orders, updateData, ...data } = useContext(OrderContext);

  const order = orders.find((item) => item.id === Number(orderId));

  useEffect(() => {
    if (!order) {
      delete query.id;

      router.push({ pathname: "/order", query });
    }
  }, [order]);

  if (!order) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Paper sx={{ width: 500 }}>
        <Typography variant="h5">orderId: {order.id}</Typography>
        <Typography variant="h5">price: {order.price}</Typography>
        <Typography variant="h5">tableId: {order.tables_id}</Typography>
      </Paper>
    </Box>
  );
};

export default ActiveOrder;
