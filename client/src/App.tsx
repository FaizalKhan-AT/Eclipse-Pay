import { FC } from "react";
import { Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello, welcome to Eclipse Pay</h1>} />
    </Routes>
  );
};

export default App;
