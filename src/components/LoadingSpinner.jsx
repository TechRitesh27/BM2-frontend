import { Box, CircularProgress } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <Box textAlign="center" mt={5}>
      <CircularProgress />
    </Box>
  );
}
