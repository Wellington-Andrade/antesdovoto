import { ImageResponse } from "next/og";
import { contentRepository } from "@/lib/repository";
export const alt = "Antes do voto — informação, contexto e fontes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = contentRepository.getCard(id);
  return new ImageResponse(
    <div
      style={{
        background: "#f5f4f0",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 70,
        justifyContent: "space-between",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", color: "#6950bf", fontSize: 26 }}>
        ANTES DO VOTO · FONTES PÚBLICAS
      </div>
      <div style={{ fontSize: 66, color: "#252525", lineHeight: 1.1 }}>
        {card?.title || "5 minutos antes do voto."}
      </div>
      <div style={{ fontSize: 28, color: "#555" }}>
        Não acredite no site. Confira a fonte.
      </div>
    </div>,
    size,
  );
}
