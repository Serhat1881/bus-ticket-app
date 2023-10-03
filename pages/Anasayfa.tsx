import React, { useState } from "react";
import { useRouter } from "next/router";
import seferler from "./data/seferler";

const Anasayfa: React.FC = () => {
  const [kalkisYeri, setKalkisYeri] = useState<string>("");
  const [varisYeri, setVarisYeri] = useState<string>("");
  const [tarih, setTarih] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0]; // Bugünkü tarihi al

  const handleAraClick = () => {
    if (!kalkisYeri || !varisYeri || !tarih) {
      setError("Lütfen tüm alanları doldurun.");
    } else {
      const sorguSonucu = seferler.filter((sefer) => {
        return (
          sefer.kalkisYeri === kalkisYeri &&
          sefer.varisYeri === varisYeri &&
          sefer.tarih === tarih
        );
      });

      console.log("Sorgu Sonuçları:", sorguSonucu);

      router.push(
        `/SorguSonucu?kalkisYeri=${kalkisYeri}&varisYeri=${varisYeri}&tarih=${tarih}`
      );
    }
  };

  return (
    <div>
      <h1>Sefer Ara</h1>
      <div>
        <label>Kalkış Yeri:</label>
        <select
          value={kalkisYeri}
          onChange={(e) => setKalkisYeri(e.target.value)}
        >
          <option value="">Seçiniz</option>
          {seferler.map((sefer) => (
            <option key={sefer.id} value={sefer.kalkisYeri}>
              {sefer.kalkisYeriLabel}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Varış Yeri:</label>
        <select
          value={varisYeri}
          onChange={(e) => setVarisYeri(e.target.value)}
        >
          <option value="">Seçiniz</option>
          {seferler.map((sefer) => (
            <option key={sefer.id} value={sefer.varisYeri}>
              {sefer.varisYeriLabel}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Tarih:</label>
        <input
          type="date"
          value={tarih}
          onChange={(e) => setTarih(e.target.value)}
          min={today} // Bugünkü tarihten önceki tarihleri seçilmesini engeller
        />
      </div>
      <button onClick={handleAraClick}>Ara</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Anasayfa;
