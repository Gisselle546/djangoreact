import React from "react";

import SliderCard from "../SliderCard/SliderCard";

type Props = {
  data: any;
  heading: string;
  subheading?: string;
};

function QueryList({ data, heading, subheading }: Props) {
  if (!data) {
    return <div>....</div>;
  }

  return (
    <>
      <section className="section-y bg-white">
        <div className="page-container">
          <h1 className="text-3xl font-bold">{heading}</h1>
          {subheading && (
            <p className="mt-2 text-slate-600 font-head font-bold">
              {subheading}
            </p>
          )}
        </div>
      </section>

      <section className="section-y">
        <div className="page-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((r: any) => (
            <SliderCard key={r.id} data={r} />
          ))}
        </div>
      </section>
    </>
  );
}

export default QueryList;
