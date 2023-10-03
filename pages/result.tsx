import React, { useState } from "react";
import { useRouter } from "next/router";
import Seferler from "./data/expeditions";

const SorguSonucu: React.FC = () => {
  const [selectedSefer, setSelectedSefer] = useState<number | null>(null);
  const router = useRouter();

  const filteredSeferler = Seferler.filter((sefer) => {
    return (
      sefer.kalkisYeri === router.query.kalkisYeri &&
      sefer.varisYeri === router.query.varisYeri &&
      sefer.tarih === router.query.tarih
    );
  });

  const handleSeferClick = (seferId: number) => {
    router.push(`/ticket?seferId=${seferId}`);
  };

  return (
    <div>
      <h1>Sorgu Sonuçları</h1>
      {filteredSeferler.length === 0 ? (
        <div>
          <h5>Uygun sefer bulunamadı.</h5>
          <p> Aşağıda mevcut seferler listeleniyor:</p>
          <ul>
            {Seferler.map((sefer) => (
              <li key={sefer.id}>
                <div>
                  <p>Kalkış: {sefer.kalkisYeri}</p>
                  <p>Varış: {sefer.varisYeri}</p>
                  <p>Tarih: {sefer.tarih}</p>
                  <p>Boş Koltuklar: {sefer.bosKoltuklar}</p>
                  <p>Fiyat: {sefer.fiyat} TL</p>
                </div>
                <button onClick={() => handleSeferClick(sefer.id)}>
                  Bilet Al
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul>
          {filteredSeferler.map((sefer) => (
            <li key={sefer.id}>
              <div>
                <p>Kalkış: {sefer.kalkisYeri}</p>
                <p>Varış: {sefer.varisYeri}</p>
                <p>Tarih: {sefer.tarih}</p>
                <p>Boş Koltuklar: {sefer.bosKoltuklar}</p>
                <p>Fiyat: {sefer.fiyat} TL</p>
              </div>
              <button onClick={() => handleSeferClick(sefer.id)}>
                Bilet Al
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SorguSonucu;
