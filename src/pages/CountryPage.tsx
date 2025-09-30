import { useState } from "react";
import Flights from "../components/Flights";
import useFlights, { type Flight } from "../hooks/useFlights";
import { useNavigate, useParams } from "react-router-dom";
import useQueryStory from "../hooks/stores/useQueryStory";
export interface Cheapest {
  airline: string;
  price: number;
}

const CountryPage = () => {
  // return <></>;
  const params = useParams();
  const nav = useNavigate();
  let country = params.country;
  let newId = parseInt(country || "0");

  const setSearch = useQueryStory((s) => s.setSearch);
  const setOrdering = useQueryStory((s) => s.setOrdering);
  // const filterCountry = useQueryStory((s) => s.filterCountry);
  const filterCity = useQueryStory((s) => s.filterCity);
  const filterAirline = useQueryStory((s) => s.filterAirline);
  const setTo = useQueryStory((s) => s.setTo);
  const to = useQueryStory((s) => s.query.to);

  // filterCountry(newId);

  const airlines = [{ name: "TAP" }, { name: "TAAG" }];

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

  const [toPT, setToPT] = useState(true);

  const { data: flights } = useFlights(newId);

  return (
    <div className="container">
      <div className="text-center">
        <p
          className="bg-bs-color d-inline p-2 rounded"
          onClick={() => {
            setTo(!to);
            setToPT(!toPT);
          }}
          style={{ cursor: "pointer" }}
        >
          Ver voos de{" "}
          <img
            src={`/${toPT ? "flag.png" : "world-flag.png"}`}
            width="30"
            height="30"
          />{" "}
          {`${toPT ? "(Portugal)" : "(São Tomé)"}`} para{" "}
          <img
            src={`/${!toPT ? "flag.png" : "world-flag.png"}`}
            width="30"
            height="30"
          />{" "}
          {`${!toPT ? "(Portugal)" : "(São Tomé)"}`}
        </p>{" "}
        <hr />
        {toPT && (
          <div className={`d-flex justify-content-center align-items-center`}>
            <img src="/world-flag.png" width="50" height="50" />
            <img src="/direct-flight.png" width="100" height="100" />
            <img src="/flag.png" width="50" height="50" />
          </div>
        )}
        {!toPT && (
          <div className={`d-flex justify-content-center align-items-center`}>
            {" "}
            <img src="/flag.png" width="50" height="50" />
            <img src="/direct-flight.png" width="100" height="100" />
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
                para de{" "}
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

export default CountryPage;
