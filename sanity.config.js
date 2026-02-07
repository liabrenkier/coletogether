import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { apiVersion, dataset, projectId } from "./sanity/env.js";
import { schemaTypes } from "./sanity/schemaTypes/index.js";

export default defineConfig({
  name: "default",
  title: "Cole Together CMS",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes
  }
});
