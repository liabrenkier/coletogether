"use client";

import config from "@/sanity.config";
import { projectId } from "@/sanity/env";
import { NextStudio } from "next-sanity/studio";

export default function StudioPage() {
  if (!projectId) {
    return (
      <main style={{ padding: "24px" }}>
        <h1>Falta configurar Sanity</h1>
        <p>
          Completa <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> y <code>NEXT_PUBLIC_SANITY_DATASET</code> para usar
          el Studio.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
