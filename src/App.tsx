import { RouterProvider } from "react-router-dom";
import router from "./routes";
import GlobalSnackbar from "./components/common/GlobalSnackbar";
import GlobalLoading from "./components/common/GlobalLoading";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalSnackbar />
      <GlobalLoading />
    </>
  );
};

export default App;
