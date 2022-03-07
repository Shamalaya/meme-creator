import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Footer, Navbar, Sidebar } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, SingleMeme, FormMeme, Login } from './pages';
import TemplateSelect from './components/TemplateSelect';


function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route exact path='/new' element={<TemplateSelect />}>
        </Route>
        <Route exact path='/login' element={<Login />}>
        </Route>
        <Route exact path='/new/:id' element={<FormMeme />}>
        </Route>
        <Route exact path='/memes/:id' element={<SingleMeme />} />
        <Route path="/copy/:id/">
        </Route>
        <Route path='*'>
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
