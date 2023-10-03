import React, { useState } from "react";
import { useRouter } from "next/router";
import seferler from "./data/expeditions";

interface Sefer {
  id: number;
  kalkisYeri: string;
  varisYeri: string;
  tarih: string;
  kalkisYeriLabel: string;
  varisYeriLabel: string;
  fiyat: number;
  koltuklar: { dolu: boolean; cinsiyet: string | null }[];
}

const BiletSatis: React.FC = () => {
  const router = useRouter();
  const { seferId } = router.query;
  const [selectedKoltuklar, setSelectedKoltuklar] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

  const sefer: Sefer | undefined = seferler.find(
    (s) => s.id === Number(seferId)
  );

  const toplamFiyat: number = selectedKoltuklar.reduce(
    (toplam, koltukNo) => toplam + sefer!.fiyat,
    0
  );

  const handleKoltukClick = (koltukNo: number) => {
    const selectedKoltuk = sefer!.koltuklar[koltukNo];
    if (selectedKoltuk.dolu) {
      setError("Bu koltuk dolu. Lütfen başka bir koltuk seçin.");
    } else if (selectedKoltuklar.includes(koltukNo)) {
      setSelectedKoltuklar(selectedKoltuklar.filter((k) => k !== koltukNo));
      setError("");
    } else if (selectedKoltuklar.length < 5) {
      if (
        selectedKoltuklar.some(
          (selectedKoltukNo) => Math.abs(selectedKoltukNo - koltukNo) === 1
        )
      ) {
        setError("Yan yana iki koltuk birlikte alınamaz.");
      } else {
        setSelectedKoltuklar([...selectedKoltuklar, koltukNo]);
        setError("");
      }
    } else {
      setError("En fazla 5 koltuk seçebilirsiniz.");
    }
  };

  const getKoltukBackgroundColor = (koltukNo: number): string => {
    const selectedKoltuk = sefer!.koltuklar[koltukNo];
    if (selectedKoltuklar.includes(koltukNo)) {
      return "grey";
    } else if (selectedKoltuk.dolu) {
      return selectedKoltuk.cinsiyet === "kadın" ? "" : "";
    }
    return "";
  };

  const handleDevamClick = () => {
    if (selectedKoltuklar.length === 0) {
      setError("Lütfen en az bir koltuk seçin.");
    } else {
      router.push(`/payment?seferId=${seferId}`);
    }
  };

  if (!sefer) {
    return <div>Sefer bulunamadı.</div>;
  }

  return (
    <div>
      <h1>Bilet Satış</h1>
      <h2>Sefer Detayları</h2>
      <p>
        Kalkış: {sefer.kalkisYeriLabel} - Varış: {sefer.varisYeriLabel} - Tarih:{" "}
        {sefer.tarih} - Fiyat: {sefer.fiyat} TL
      </p>
      <h2>Koltuk Seçimi Yapın</h2>
      <div className="koltuklar" style={{ margin: "1rem 1rem 1rem 1rem" }}>
        {sefer.koltuklar.map((koltuk, index) => (
          <div
            key={index}
            className={`koltuk ${koltuk.dolu ? "dolu" : ""} ${
              selectedKoltuklar.includes(index) ? "secili" : ""
            }`}
            style={{
              backgroundColor: getKoltukBackgroundColor(index),
              width: "1rem",
              textAlign: "center",
            }}
            onClick={() => handleKoltukClick(index)}
          >
            <p>
              {koltuk.dolu ? (
                <span>
                  {koltuk.cinsiyet === "erkek" ? "Dolu Erkek" : "Dolu Kadın"}
                </span>
              ) : (
                index + 1
              )}
            </p>
          </div>
        ))}
      </div>
      <p className="uyari">{error}</p>
      <h2>Toplam Fiyat</h2>
      <p>{toplamFiyat} TL</p>
      <button onClick={handleDevamClick}>Devam</button>
    </div>
  );
};

export default BiletSatis;
