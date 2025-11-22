import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { Recomendacion } from "./Recomendation";  

export function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError("Debes introducir email y contraseña");
      return;
    }

    if (!isValidEmail(email)) {
      setError("El correo electrónico no tiene un formato válido");
      return;
    }

    setError("");
    console.log("Email:", email, "Password:", password);
    // Aquí iría la lógica real de login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6">Login</h2>

      <form className="flex flex-col w-64 gap-4 text-black">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded-lg border-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded-lg border-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="button" className="mt-2 p-2" onClick={handleLogin}>
          Log In
        </Button>
      </form>
      <Link to="/">
        <Button className="mt-4 p-2 bg-gray-500 hover:bg-gray-400">Volver</Button>
      </Link>
      <Recomendacion barrios={["Barrio Gótico", "El Raval", "Gràcia"]} />
    </div>
  );
}
