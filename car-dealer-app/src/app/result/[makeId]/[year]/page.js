"use client";

import { CarCard } from "@/app/compoentns/car-card/car-card";
import Loading from "@/app/compoentns/loading/loading";
import { useEffect, useState } from "react";

function VehicleList({ makeId, year }) {
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );

        const data = await response.json();
        setVehicleData(data.Results);
      } catch (error) {
        console.error("Error fetching vehicle models:", error);
        setError(error);
      }
    };

    fetchVehicleData();
  }, [makeId, year]);

  if (!vehicleData)
    return (
      <div className="container mx-auto p-8 ">
        {" "}
        <Loading />
      </div>
    );

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 grid gap-4 grid-cols-4">
      {vehicleData.map((data) => (
        <CarCard key={data.Model_ID} data={data} />
      ))}
    </div>
  );
}

export default function ResultPage({ params }) {
  const { makeId, year } = params;
  return <VehicleList makeId={makeId} year={year} />;
}
