import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Giris: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storedUserData = localStorage.getItem("userData");

    if (!storedUserData) {
      setError("Kayıtlı kullanıcı bilgisi bulunamadı.");
      return;
    }

    const userData = JSON.parse(storedUserData);

    if (userData.email === email && userData.password === password) {
      console.log("Başarıyla giriş yapıldı!");
      router.push("/home");
    } else {
      setError("E-posta veya şifre hatalı.");
    }
  };

  return (
    <div>
      <h1>Giriş Yap</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Henüz bir hesabınız yok mu? <Link href="/register">Kayıt Ol</Link>
      </p>
    </div>
  );
};

export default Giris;
