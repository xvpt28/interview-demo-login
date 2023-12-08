import { SnackbarProvider } from "notistack";
import RouterConfig from "./routes/RouterConfig";

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
