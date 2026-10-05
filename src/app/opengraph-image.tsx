import { ImageResponse } from "next/og";
export const alt = "Antes do voto — Flávio Bolsonaro e Lula";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f7f6f2",
        display: "flex",
        flexDirection: "column",
        padding: 70,
        justifyContent: "space-between",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ color: "#6850b7", fontSize: 26 }}>
        ANTES DO VOTO · FLÁVIO BOLSONARO E LULA
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 96,
          color: "#242624",
          letterSpacing: -5,
          lineHeight: 1.05,
        }}
      >
        <span>5 minutos</span>
        <span>antes do voto.</span>
      </div>
      <div style={{ fontSize: 28, color: "#62655f" }}>
        Não acredite no site. Confira a fonte.
      </div>
    </div>,
    size,
  );
}
