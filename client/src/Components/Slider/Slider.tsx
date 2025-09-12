import React, { useEffect, useRef, useState } from "react";
import SliderCard from "../SliderCard/SliderCard";
//import SliderCard from "../SliderCard/SliderCard";
//import { ArrowRight, ArrowLeft, SliderWrapper } from './Slider.style'

type Props = {
  data: any;
};

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function Slider({ data }: Props) {
  const [jersey, setJersey] = useState([]);

  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function sync() {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  function scroll(dir: -1 | 1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: "smooth" });
  }

  useEffect(() => {
    function getInitialJerseyData() {
      if (!data) {
        return [];
      }
      return data.slice(0, 4);
    }
    setJersey(getInitialJerseyData());
  }, [data]);

  if (!jersey) {
    return <div>....</div>;
  }

  return (
    <div className="relative">
      {!atStart && (
        <button
          aria-label="Scroll featured left"
          onClick={() => scroll(-1)}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-3 shadow"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
      )}
      {!atEnd && (
        <button
          aria-label="Scroll featured right"
          onClick={() => scroll(1)}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-3 shadow"
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      )}
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {jersey.map((f: any) => (
          <SliderCard data={f} key={f.product_id} />
        ))}
      </div>
    </div>
  );
}

export default Slider;
