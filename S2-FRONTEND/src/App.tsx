import GlobalStyles from "./styles/GlobalStyles";
import { RoutesMain } from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "./providers/userProvider";


function App() {
  return (
    <>
      <GlobalStyles />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <UserProvider>
        <RoutesMain />
      </UserProvider>
    </>
  );
}

export default App;
