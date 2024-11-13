"use client";

import { useEffect, useState } from 'react';
import cookies from 'js-cookie';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (cookies.get("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex min-h-screen justify-center px-4">
      {isLoggedIn ? (
        <h1>Você está logado</h1>
      ) : (
        <h1>Você não está logado</h1>
      )}
    </div>
  );
}