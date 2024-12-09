import { FC, useEffect, useCallback, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAirportData } from "../../lib/hooks/useAirportData";
import { SearchContext } from "../../context/SearchContext";
import { AirportData } from "../../type/airport.type";
const limit = 100;

const Home: FC = () => {
  const [endpoint, setEndpoint] = useState<string>("");
  const { data, loading, error } = useAirportData(endpoint, 'airportData');
  const [displayedData, setDisplayedData] = useState<AirportData[]>([]);
  const [page, setPage] = useState<number>(1);

  const searchContext = useContext(SearchContext);
  const searchTerm = searchContext?.searchTerm || "";

  const navigate = useNavigate();

  const loadMoreData = useCallback(() => {
    if (data && displayedData.length < data.length) {
      const nextPage = page + 1;
      const newDisplayedData = data.slice(0, nextPage * limit);
      setDisplayedData(newDisplayedData);
      setPage(nextPage);
    }
  }, [data, displayedData.length, page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreData();
    }
  }, [loadMoreData]);

  useEffect(() => {
    setEndpoint("/flight/refData/airport");
  }, []);

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(
        (airport: AirportData) =>
          airport.airportName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          airport.airportCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedData(filteredData.slice(0, page * limit));
    }
  }, [data, searchTerm, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  const handleDetailsClick = (airportCode: string) => {
    navigate(`/details/${airportCode}`);
  };
  return (
    <div className="airport_list_wrapper">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {displayedData && (
        <div className="airport_list">
          {displayedData.map((airport: AirportData, index: number) => (
            <div
              className="airport_item"
              key={`${airport.airportCode}-${index}`}
            >
              <span className="airport_name_code">
                {airport.airportName} - {airport.airportCode}
              </span>
              <div className="airport_status_wrapper">
                <span
                  className={`airport_status ${
                    !airport.domesticAirport
                      ? "airport_status_false"
                      : "airport_status_true"
                  }`}
                >
                  Domestic
                </span>
                <span
                  className={`airport_status ${
                    !airport.eticketableAirport
                      ? "airport_status_false"
                      : "airport_status_true"
                  }`}
                >
                  eTicketable
                </span>
                <span
                  className={`airport_status ${
                    !airport.internationalAirport
                      ? "airport_status_false"
                      : "airport_status_true"
                  }`}
                >
                  International
                </span>
                <span
                  className={`airport_status ${
                    !airport.onlineIndicator
                      ? "airport_status_false"
                      : "airport_status_true"
                  }`}
                >
                  Indicator
                </span>
                <span
                  className={`airport_status ${
                    !airport.regionalAirport
                      ? "airport_status_false"
                      : "airport_status_true"
                  }`}
                >
                  Regional
                </span>
              </div>
              <div className="goto_details">
                <button
                  className="goto_details_btn"
                  onClick={() => handleDetailsClick(airport.airportCode)}
                >
                  view airport
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
