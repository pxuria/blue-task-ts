import { Route, Routes } from "react-router-dom";
import { Facilities, Home, NotFound, SharedLayout } from "./pages";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
