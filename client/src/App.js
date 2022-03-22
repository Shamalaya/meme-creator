import logo from "./logo.svg";
import "./App.css";

import { Footer, Navbar, Sidebar } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SingleMeme, FormMeme, Login } from "./pages";
import TemplateSelect from "./components/TemplateSelect";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/new" element={<TemplateSelect />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/new/:id" element={<FormMeme />}></Route>
          <Route exact path="/memes/:id" element={<SingleMeme />} />
          <Route exact path="/copy/:id/" element={<FormMeme copy={true} />} />
          <Route path="*"></Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
