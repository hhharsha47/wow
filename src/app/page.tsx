"use client";

import dynamic from "next/dynamic";

const SwaggerClient = dynamic(() => import("../components/SwaggerClient"), {
  ssr: false,
  loading: () => <p>Loading API Documentation...</p>,
});

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <SwaggerClient url="/docs/openapi.yaml" />
    </div>
  );
}
