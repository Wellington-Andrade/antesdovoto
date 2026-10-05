"use client";
import { createContext, useContext, useMemo } from "react";
import {
  contentRepository,
  createContentRepository,
  type ContentDataset,
} from "@/lib/repository";
const Catalog = createContext(contentRepository);
export function ContentCatalog({
  data,
  children,
}: {
  data: ContentDataset;
  children: React.ReactNode;
}) {
  const repository = useMemo(() => createContentRepository(data), [data]);
  return <Catalog.Provider value={repository}>{children}</Catalog.Provider>;
}
export const useContentRepository = () => useContext(Catalog);
