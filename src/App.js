import logo from './logo.svg';
import './App.css';


import { Footer, Navbar, Sidebar } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, SingleMeme } from './pages';


function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route exact path='/new'>
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
