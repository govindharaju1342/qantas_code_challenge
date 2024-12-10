import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Header from "./components/Header/Header";
import "./App.css";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <SearchProvider>

      <Router>
      <div className="App" aria-labelledby="airport-app">
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
