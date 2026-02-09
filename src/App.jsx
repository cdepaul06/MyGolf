import LandingPage from "./components/LandingPage/LandingPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";

const App = ({}) => {
  return (
    <>
      <LandingPage />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
