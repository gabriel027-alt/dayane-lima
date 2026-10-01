"use client";

import React from "react";
import EditorialArchiveGallery, { EditorialArchiveGalleryProps } from "./EditorialArchiveGallery";
import { MediaCategory, MediaCatalogItem, getMediaByCategory } from "@/data/mediaCatalog";

export type { MediaCatalogItem as ShowcaseItem, MediaCategory };

export interface ShowcaseGridProps extends EditorialArchiveGalleryProps {
  // Backwards-compatible aliases if passed
  columns?: number;
  aspectRatio?: string;
}

export function ShowcaseGrid(props: ShowcaseGridProps) {
  return <EditorialArchiveGallery {...props} />;
}

export default ShowcaseGrid;
