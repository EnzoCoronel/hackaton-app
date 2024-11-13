"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import cookies from 'js-cookie'

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // position

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data = { email, password };

    try {
      const res = await fetch("http://localhost:3001/business/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const { token } = await res.json();
      cookies.set('token', token, {expires: 60 * 60})
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-52 py-10">
      <h1>Submit Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="email">email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">senha</Label>
          <Input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
}
