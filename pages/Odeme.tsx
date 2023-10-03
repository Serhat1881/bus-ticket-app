import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Odeme: React.FC = () => {
  const router = useRouter();
  const { seferId } = router.query;
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const simulatePayment = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
    }, 1000);
  };

  useEffect(() => {
    if (paymentSuccess) {
      setTimeout(() => {
        router.push("/Anasayfa");
      }, 3000);
    }
  }, [paymentSuccess, router]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulatePayment();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, cardNumber: value });
    if (value.length > 0) {
      setFormData({
        ...formData,
        cardNumber: value
          .match(/.{1,4}/g)!
          .join(" ")
          .substring(0, 19),
      });
    }
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setFormData({ ...formData, cvv: value });
    }
  };

  return (
    <div>
      <h1>Ödeme</h1>
      {paymentSuccess ? (
        <div>
          <p>Ödeme başarıyla tamamlandı!</p>
          <p>Anasayfaya yönlendiriliyorsunuz...</p>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Ad Soyad:</label>
            <input
              type="text"
              placeholder="Ad Soyad"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Kredi Kartı Numarası:</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              required
            />
          </div>
          <div>
            <label>CVV:</label>
            <input
              type="text"
              placeholder="123"
              value={formData.cvv}
              onChange={handleCVVChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            Ödeme Yap
          </button>
          {loading && <p>Ödeme işlemi yapılıyor...</p>}
        </form>
      )}
    </div>
  );
};

export default Odeme;
