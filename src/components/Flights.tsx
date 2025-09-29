import type { Flight } from "../hooks/useFlights";

interface Props {
  flight: Flight;
  chepeast: number;
}
const Flights = ({ flight, chepeast }: Props) => {
  function createWhatsAppLink(message: string): string {
    // 1. A função encodeURIComponent() codifica a string para uso em URL,
    // substituindo espaços por %20 e caracteres especiais (como 'á', '!') por seus códigos.
    const encodedMessage: string = encodeURIComponent(message);

    // 2. Cria o link final usando o formato wa.me
    const waLink: string = `https://wa.me/447424095648?text=${encodedMessage}`;

    return waLink;
  }
  // console.log(chepeast);
  return (
    <div className="m-2 d-flex flex-column">
      {flight.final_price == chepeast && (
        <p
          className="text-center mb-0  rounded-top bg-info text-dark  px-3 fw-bold"
          style={{ margin: "0 auto" }}
        >
          o preço mais baixo na {flight.airline.name}
        </p>
      )}
      <div
        className={`d-flex justify-content-between align-items-center p-2  border border-2  border-info rounded-4 fw-bold ${
          flight.final_price == chepeast ? "b-bs-color" : ""
        }`}
      >
        <span>{flight.airline.name}</span>
        <span>
          {new Date(flight.date).getDate()}/
          {new Date(flight.date).getMonth() + 1}
        </span>
        <span>
          {flight.final_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          &nbsp;{flight.city.id == 1 ? `dbs` : `dbs`}
        </span>
        <a
          target="_blank"
          href={createWhatsAppLink(
            `Olá! Quero fazer reserva no voo de ${flight.city.name} para ${
              flight.city_to.name
            } na ${flight.airline.name} no dia ${new Date(
              flight.date
            ).getDate()}/${
              new Date(flight.date).getMonth() + 1
            } que está por volta de ${flight.final_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
              flight.city.id == 1 ? " dbs" : " dbs"
            }. `
          )}
          className="btn rounded bg-bs-color"
        >
          Pedir Reserva
        </a>
        {/* <span>{flight.airline.name}</span> */}
      </div>
    </div>
  );
};

export default Flights;
