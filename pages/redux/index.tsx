import {
  decrement,
  fetchContent,
  increment,
} from "@/store/slices/counterSlice";
import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const ReduxConcepts = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Typography variant="h2" sx={{ textAlign: "center", mt: 5 }}>
        {count}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          onClick={() => dispatch(decrement())}
          sx={{ width: "fit-content" }}
        >
          Decrease (-)
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch(increment())}
          sx={{ width: "fit-content", mx: 2 }}
        >
          Increase (+)
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch(fetchContent())}
          sx={{ width: "fit-content" }}
        >
          fetch data
        </Button>
      </Box>
    </Box>
  );
};

export default ReduxConcepts;
