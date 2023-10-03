import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (
        formData.email === "" ||
        formData.password === "" ||
        formData.firstName === "" ||
        formData.lastName === "" ||
        formData.gender === "" || // Validate gender
        formData.birthDate === ""
      ) {
        setError("Lütfen tüm alanları doldurun.");
        return;
      }

      localStorage.setItem("userData", JSON.stringify(formData));

      router.push("/login");
    } catch (error) {
      setError("Kayıt sırasında bir hata oluştu.");
    }
  };

  return (
    <div
      style={{
        width: "250px",
      }}
    >
      <h1>Kayıt Ol</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="Ad"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Soyad"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Cinsiyet Seçiniz</option>
          <option value="Erkek">Erkek</option>
          <option value="Kadın">Kadın</option>
        </select>
        <input
          type="date"
          name="birthDate"
          placeholder="Doğum Tarihi"
          value={formData.birthDate}
          onChange={handleChange}
          max={today}
          required
        />
        <button type="submit">Kayıt Ol</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Zaten bir hesabınız var mı? <Link href="/login">Giriş Yap</Link>
      </p>
    </div>
  );
};

export default Register;
