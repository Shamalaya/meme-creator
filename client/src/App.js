import React from "react";
import "./App.css";

import { Footer, Navbar, Sidebar } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  SingleMeme,
  FormMeme,
  Login,
  PrivateRoute,
  Error,
  Memes,
} from "./pages";
import TemplateSelect from "./components/TemplateSelect";
import MemeForm from "./components/MemeForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/memes" element={<Memes myMemes={false} />} />
          <Route exact path="/mymemes" element={<PrivateRoute />}>
            <Route exact path="/mymemes" element={<Memes myMemes={true} />} />
          </Route>

          <Route exact path="/new" element={<PrivateRoute />}>
            <Route exact path="/new" element={<TemplateSelect />} />
          </Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/new/:id" element={<PrivateRoute />}>
            <Route exact path="/new/:id" element={<MemeForm />} />
          </Route>
          <Route exact path="/memes/:id" element={<SingleMeme />} />
          <Route exact path="/copy/:id" element={<PrivateRoute />}>
            <Route exact path="/copy/:id/" element={<FormMeme copy={true} />} />
          </Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
