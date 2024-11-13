"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { distances } from "../../../utils/distances";
import { SelectTrigger } from "@radix-ui/react-select";
import { Cities } from "../../../utils/cities";

export default function Business() {
  const [business, setBusiness] = useState<any[]>([]); // Store fetched business data
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [location, setLocation] = useState<string | null>(null); // Default location
  const [distance, setDistance] = useState<string>("10"); // Default distance
  const [city, setCity] = useState<string>(""); // Allow initial empty city value

  // Get the user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude},${position.coords.longitude}`);
          setError(null); // Clear any previous error
        },
        (error) => {
          setError("Location access denied or unavailable.");
          console.error(error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Function to fetch business data
  const fetchBusinessData = async () => {
    try {
      setLoading(true);

      const queryLocation = location || "0"; // Default location
      const queryCity = city || ""; // If no city, fetch all businesses
      const queryDistance = distance || "10"; // Default distance

      let url = `http://localhost:3001/business/${queryCity}/${queryLocation}/${queryDistance}`;

      if (queryCity === "") {
        // If no city, use the endpoint that fetches all businesses but apply distance if available
        url = `http://localhost:3001/business?distance=${queryDistance}&location=${queryLocation}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch business data");
      }

      const data = await response.json();
      setBusiness(data); // Update state with fetched data
    } catch (err) {
      setError("An error occurred while fetching business data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and whenever parameters change
  useEffect(() => {
    fetchBusinessData(); // Fetch data based on selected parameters
  }, [location, distance, city]); // Re-fetch when any of these state values change

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchBusinessData(); // Fetch data based on selected parameters
  };

  return (
    <div className="md:px-52 py-12">
      <div className="flex flex-col space-y-2">
        <form onSubmit={handleSubmit} className="text-center py-5">
          {/* Distance Select */}
          <Select onValueChange={(value) => setDistance(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione uma distância" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(distances).map(([label, value]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* City Select */}
          <Select onValueChange={(value) => setCity(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione uma cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(Cities).map(([label, value]) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Submit Button */}
          {/* <Button type="button" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </Button> */}
        </form>
      </div>

      {/* Display Cards of Businesses */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {business.length > 0 ? (
          business.map((businessItem: any) => (
            <Card key={businessItem.id}>
              <CardHeader>
                {businessItem.urgency && (
                  <div className="w-full bg-yellow-500">Emergência</div>
                )}
                <CardTitle>{businessItem.name}</CardTitle>
                <CardDescription>
                  <img src={businessItem.logo} alt="Business Logo" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{businessItem.city}</p>
              </CardContent>
              <CardFooter>
                <p>{businessItem.description}</p>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No businesses found</p>
        )}
      </div>
    </div>
  );
}
