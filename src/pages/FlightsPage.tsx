import { useState } from "react";
import Flights from "../components/Flights";
import useFlights, { type Flight } from "../hooks/useFlights";
export interface Cheapest {
  airline: string;
  price: number;
}
const FlightsPage = () => {
  const { data: flights } = useFlights(1);

  const airlines = [{ name: "TAAG" }, { name: "TAP" }];

  const getChepeast = (flight: Flight) => {
    const localFlights = flights?.results.filter(
      (c) => c.airline.name == flight.airline.name
    );
    let tempChepeast = localFlights?.length ? localFlights[0].final_price : 0;

    localFlights?.map((c) => {
      tempChepeast =
        tempChepeast > c.final_price ? c.final_price : tempChepeast;
    });

    return tempChepeast;
  };

  const [fromSTP] = useState(true);

  return (
    <div className="container">
      <div className="text-center">
        {/* <p
          className="bg-bs-color d-inline p-2 rounded"
          onClick={() => setFromSTP(!fromSTP)}
          style={{ cursor: "pointer" }}
        >
          Ver voos de <img src="/flag.png" width="30" height="30" /> (Portugal)
          para <img src="/world-flag.png" width="30" height="30" /> (São Tomé)
        </p>{" "}
        <hr />
       */}
        {fromSTP && (
          <div className={`d-flex justify-content-center align-items-center`}>
            <img src="/world-flag.png" width="50" height="50" />
            <img
              src="/direct-flight.png"
              width="100"
              height="100"
              className="align-self-start"
            />
            <img src="/flag.png" width="50" height="50" />
          </div>
        )}
        {!fromSTP && (
          <div className={`d-flex justify-content-center align-items-center`}>
            {" "}
            <img src="/flag.png" width="50" height="50" />
            <img
              src="/direct-flight.png"
              width="100"
              height="100"
              className="align-self-start"
            />
            <img src="/world-flag.png" width="50" height="50" />
          </div>
        )}
      </div>

      {airlines.map((airline, key) => (
        <div key={key}>
          <div className="text-center mb-3">
            {(flights?.results?.filter((f) => f.airline.name == airline.name)
              .length && (
              <h2
                style={{ fontSize: "1.6rem" }}
                className="text-center rounded  d-inline px-3"
              >
                Voos da <span className="c-bs-color fs-3">{airline.name}</span>{" "}
                <br />
                de{" "}
                <span className="c-bs-color fs-3">
                  {flights?.results[0].city.name}
                </span>{" "}
                para{" "}
                <span className="c-bs-color fs-3">
                  {flights?.results[0].city_to.name}
                </span>
              </h2>
            )) ||
              ""}
          </div>

          <div key={key} className="row align-items-end justify-content-center">
            {flights?.results
              ?.filter((f) => f.airline.name == airline.name)
              .map((flight, index) => (
                <div key={index} className="col-xl-4 col-md-6 col-sm-12 ">
                  <Flights
                    chepeast={getChepeast(flight)}
                    flight={flight}
                    key={index}
                  />
                </div>
              ))}
          </div>
          {flights?.results?.filter((f) => f.airline.name == airline.name) && (
            <hr />
          )}
        </div>
      ))}
      {/* {console.log(airlines)} */}
    </div>
  );
};

export default FlightsPage;
