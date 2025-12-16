"use client";

import { useEffect, useRef } from "react";
import "swagger-ui-dist/swagger-ui.css";

interface SwaggerClientProps {
  url: string;
}

const SwaggerClient = ({ url }: SwaggerClientProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const SwaggerUIBundle = (
        await import("swagger-ui-dist/swagger-ui-bundle")
      ).default;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const SwaggerUIStandalonePreset = (
        await import("swagger-ui-dist/swagger-ui-standalone-preset")
      ).default;

      if (nodeRef.current) {
        SwaggerUIBundle({
          url: url,
          domNode: nodeRef.current,
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          layout: "BaseLayout",
        });
      }
    };
    load();
  }, [url]);

  return <div ref={nodeRef} />;
};

export default SwaggerClient;
