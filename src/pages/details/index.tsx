import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AirportData } from "../../type/airport.type";

const Details: FC = () => {
  const { airportCode } = useParams<{ airportCode: string }>();
  const [airportDetails, setAirportDetails] = useState<AirportData | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (airportCode) {
      const storedData = localStorage.getItem("airportData");
      if (storedData) {
        const parsedData: AirportData[] = JSON.parse(storedData);
        const airport = parsedData.find(
          (item) => item.airportCode === airportCode
        );
        console.log("airport", airport);
        setAirportDetails(airport || null);
      }
    }
  }, [airportCode]);

  const handleBackClick = () => {
    navigate("/");
  };

  if (!airportDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="airport_details_wrapper">
      <h1>
        {airportDetails.airportName} ({airportDetails.airportCode})
      </h1>
      <div className="airport_details">
        <div className="airport_details_status">
          <p>Domestic: {airportDetails.domesticAirport ? "Yes" : "No"}</p>
          <p>eTicketable: {airportDetails.eticketableAirport ? "Yes" : "No"}</p>
          <p>
            International: {airportDetails.internationalAirport ? "Yes" : "No"}
          </p>
          <p>
            Online Indicator: {airportDetails.onlineIndicator ? "Yes" : "No"}
          </p>
          <p>Regional: {airportDetails.regionalAirport ? "Yes" : "No"}</p>
        </div>

        <div className="airport_details_box">
          <div>
            <h2>Region</h2>
            <p>Region Name: {airportDetails.region.regionName}</p>
          </div>
          <div>
            <h2>Location</h2>
            <p>
              Latitude: {airportDetails.location.latitude}{" "}
              {airportDetails.location.latitudeDirection}
            </p>
            <p>
              Longitude: {airportDetails.location.longitude}{" "}
              {airportDetails.location.longitudeDirection}
            </p>
            <p>Above Sea Level: {airportDetails.location.aboveSeaLevel} ft</p>
          </div>
          <div>
            <h2>City</h2>
            <p>City Name: {airportDetails.city.cityName}</p>
            <p>Time Zone: {airportDetails.city.timeZoneName}</p>
          </div>
          {airportDetails.state?.stateName && (
            <div>
              <h2>State</h2>
              <p>State Name: {airportDetails.state?.stateName}</p>
            </div>
          )}
          <div>
            <h2>Country</h2>
            <p>Country Name: {airportDetails.country.countryName}</p>
          </div>
        </div>
      </div>
      <div className="goto_list">
        <button className="goto_list_btn" onClick={handleBackClick}>
          Back to List
        </button>
      </div>
    </div>
  );
};

export default Details;
