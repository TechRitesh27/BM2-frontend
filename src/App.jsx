import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { Box } from "@mui/material";

function App() {
  return (
    <Box>
       <Navbar /> 
      <AppRoutes />
    </Box>
  );
}

export default App;