import { SnackbarProvider } from "notistack";
import RouterConfig from "./routes/RouterConfig";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./routes/Auth";

function App() {
  return (
    <SnackbarProvider maxSnack={1}>
      <div className="min-h-screen">
        <RouterConfig />
      </div>
    </SnackbarProvider>
  );
}

export default App;
