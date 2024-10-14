import { useEffect, useState } from "react";

import { Card } from "../../compoentns/car-card/car-card";

const apiUrl = process.env.NEXT_PUBLIC_API_APP_GET_MODELS_FROM_YEAR;

export default function VehicleList({ makeId, year }) {
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/makeId/${makeId}/modelyear/${year}?format=json`
        );

        const data = await response.json();
        setVehicleData(data.Results);
      } catch (error) {
        setError(error);
      }
    };

    fetchVehicleData();
  }, [makeId, year]);

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 grid gap-4 grid-cols-4">
      {vehicleData?.map((data) => (
        <Card key={data.Model_ID} data={data} />
      ))}
    </div>
  );
}