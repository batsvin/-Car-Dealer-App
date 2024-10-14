"use client";

import { Suspense } from "react";
import Loading from "../../../compoentns/loading/loading";
import VehicleList from "../../../feature/car-list/car-list";


export default function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <Suspense fallback={<Loading />}>
      <VehicleList makeId={makeId} year={year} />
    </Suspense>
  );
}
