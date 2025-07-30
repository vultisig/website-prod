"use client";

import { useLayoutEffect, useRef, useState } from "react";

export default function ClientsSection() {
  const clients = [
    { name: "DeFi Suisse", image: "/images/defi-suisse-logo.png" },
    { name: "THORChain", image: "/images/thorchain-logo.png" },
    { name: "Rujira", image: "/images/rujira-logo.png" },
  ];

  const setRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const [repeatCount, setRepeatCount] = useState(2);

  useLayoutEffect(() => {
    function measure() {
      if (!setRef.current || !containerRef.current) return;
      const singleSetWidth = setRef.current.offsetWidth;
      const containerWidth = containerRef.current.offsetWidth;

      if (!singleSetWidth || !containerWidth) return;

      // Repeat enough times to overflow the container + extra buffer
      const needed = Math.ceil(containerWidth / singleSetWidth) + 2;
      setRepeatCount(needed);
      setSetWidth(singleSetWidth);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const repeatedSets = Array.from({ length: repeatCount }).map((_, i) => (
    <div
      key={i}
      ref={i === 0 ? setRef : null}
      className="flex flex-shrink-0"
    >
      {clients.map((client, idx) => (
        <div key={`${i}-${idx}`} className="flex items-center mx-4 sm:mx-8">
          <img
            src={client.image}
            alt={client.name}
            className="h-8 sm:h-12 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  ));

  return (
    <section className="py-16 px-4 border-b border-t border-[var(--border-color)]"> {/* bg-[#020e22] */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-gray-300 text-base sm:text-lg">
          Vultisig Vaults are battle-tested and trusted by thousands of users,
          <br className="hidden sm:block" />
          with numbers growing daily.
        </p>
      </div>

      <div className="overflow-hidden" ref={containerRef}>
        <div
          className="flex"
          style={
            setWidth > 0
              ? {
                  width: `${setWidth * repeatCount}px`,
                  animation: `scrollClients 10s linear infinite`,
                }
              : undefined
          }
        >
          {repeatedSets}
        </div>
      </div>

      {setWidth > 0 && (
        <style jsx>{`
          @keyframes scrollClients {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${setWidth}px);
            }
          }
        `}</style>
      )}
    </section>
  );
}
