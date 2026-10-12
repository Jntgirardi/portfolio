import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { isPlaceholder, siteUrl } from "@/lib/site";

export const alt = `${profile.name} — Portfólio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const role = isPlaceholder(profile.role) ? "PORTFÓLIO" : profile.role;
  const host = siteUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#111112",
          color: "#f5f6f7",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 64,
              background: "#1ae57e",
              color: "#111112",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            {profile.initials}
          </div>
          <span
            style={{
              color: "#1ae57e",
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {role}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 116,
              lineHeight: 0.95,
              letterSpacing: -4,
              textTransform: "uppercase",
              fontWeight: 800,
              color: "#1ae57e",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 36,
              display: "flex",
              justifyContent: "space-between",
              borderTop: "2px solid #26292e",
              paddingTop: 28,
              fontSize: 26,
              color: "#9ca3af",
            }}
          >
            <span>{host}</span>
            <span style={{ color: "#1ae57e" }}>
              ON TRACK // PROJETOS · EXPERIÊNCIA · CONTATO
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
