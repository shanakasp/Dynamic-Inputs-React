import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddInput from "./component/AddInput";
import ShowAskedQ from "./component/ShowAskedQ";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/addinput" element={<AddInput />} />
          <Route path="/ShowAskedQ" element={<ShowAskedQ />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
