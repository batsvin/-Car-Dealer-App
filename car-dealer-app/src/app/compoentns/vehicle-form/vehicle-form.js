"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function VehicleForm() {
  const [vehicle, setVehicle] = useState([]);
  const [year, setYear] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [error, setError] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => 2015 + i
  );

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
        );
        const data = await response.json();
        setVehicle(data.Results);
      } catch (error) {
        console.error("Error fetching vehicle makes:", error);
        setError(error);
      }
    };

    fetchMakes();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <form className="mx-4">
        <label
          htmlFor="vehicle"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an vehicle makes
        </label>
        <select
          value={vehicleMake}
          onChange={(e) => {
            setVehicleMake(e.target.value);
          }}
          id="vehicle"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option disabled>{vehicleMake}</option>
          {vehicle.map((make) => (
            <option key={make.MakeId} value={make.MakeName}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </form>
      <form className="me-4">
        <label
          htmlFor="year"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Model Year
        </label>
        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
          id="year"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option disabled>{year}</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </form>
      <div className="content-end">
        <button
          type="button"
          className={`${
            year === "" || vehicleMake === ""
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          } text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-blue-800`}
          disabled={year === "" || vehicleMake === ""}
        >
          {" "}
          {year === "" || vehicleMake === "" ? (
            "Next"
          ) : (
            <Link
              href={`/result/${
                vehicle.find((e) => e.MakeName === vehicleMake)?.MakeId
              }/${year}`}
            >
              Next
            </Link>
          )}
        </button>
      </div>
    </div>
  );
};
