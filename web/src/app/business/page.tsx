"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Business() {
  const [business, setBusiness] = useState<any[]>([]); // Store fetched business data
  const [loading, setLoading] = useState<boolean>(true); // To handle loading state
  const [error, setError] = useState<string | null>(null); // To handle errors

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await fetch("http://localhost:3001/business");
        if (!response.ok) {
          throw new Error("Failed to fetch business data");
        }
        const data = await response.json();
        setBusiness(data); // Update state with fetched data
      } catch (err) {
        setError("An error occurred while fetching business data.");
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchBusinessData(); // Call the function to fetch business data
  }, []);
  return (
    <div className="px-10 py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {business.map((business: any) => (
          <Card key={business.id}>
            <CardHeader>
              {business.urgency === true ? (
                <div className="w-full bg-yellow-500">Emergência</div>
              ) : <></>}
              <CardTitle>{business.name}</CardTitle>
              <CardDescription>
                <img src={business.logo}></img>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
