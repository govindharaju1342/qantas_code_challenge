import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/details";
import Header from "./components/Header/Header";
import "./App.css";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <SearchProvider>

      <Router>
      <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:airportCode" element={<Details />} />
            
          </Routes>
        </div>
      </Router>
     
    </SearchProvider>
  );
}

export default App;
