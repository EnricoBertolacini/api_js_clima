
import { useState, useEffect } from "react";
import api from "./api";

function Clima() {
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarClima() {
      try {
        setLoading(true);
        setErro("");

        const resposta = await api.get("/forecast", {
          params: {
            latitude: -23.55,
            longitude: -46.63,
            current: "temperature_2m,relative_humidity_2m,weather_code",
            timezone: "America/Sao_Paulo",
          },
        });

        setClima(resposta.data.current);
      } catch (error) {
        setErro("Não foi possível carregar o clima.");
      } finally {
        setLoading(false);
      }
    }

    buscarClima();
  }, []);

  return (
    <div>
      <h1>Clima em São Paulo</h1>

      {loading && <p>Carregando clima...</p>}

      {erro && <p>{erro}</p>}

      {clima && !loading && (
        <div>
          <p>Temperatura: {clima.temperature_2m} °C</p>
          <p>Umidade: {clima.relative_humidity_2m}%</p>
          <p>Código do clima: {clima.weather_code}</p>
        </div>
      )}
    </div>
  );
}

export default Clima;
