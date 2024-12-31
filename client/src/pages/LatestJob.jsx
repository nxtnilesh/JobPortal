import { Button } from "@/components/ui/button";
import React from "react";
import LatestJobCards from "./LatestJobCard";

const LatestJob = () => {
  const randomJob = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="max-w-7xl mx-auto my-30">
      <div className="text-4xl font-bold">
        <h1>
          <span className="text-brand">Latest & Top</span> Job Openings
        </h1>
        <div className="grid grid-cols-2 gap-4 my-5">
          {randomJob.slice(0, 6).map((item) => (
            <LatestJobCards/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestJob;
