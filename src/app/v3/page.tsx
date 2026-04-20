import Hero from "@/components/v3/Hero";
import QualifierForm from "@/components/v3/QualifierForm";
import StickyCta from "@/components/v3/StickyCta";

export default function HomeV3() {
  return (
    <main className="relative min-h-screen bg-void overflow-x-hidden">
      {/* Tactical grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Hero />

      <div style={{ width: "100%", maxWidth: "448px", marginLeft: "auto", marginRight: "auto", height: "1px", background: "linear-gradient(to right, transparent, rgba(249,115,22,0.2), transparent)" }} />

      <QualifierForm />

      <StickyCta />

      {/* Footer */}
      <footer style={{ padding: "32px 0", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <p style={{ fontSize: "12px", color: "#78716c" }}>
          &copy; {new Date().getFullYear()} Reachflow. Tous droits réservés.
        </p>
      </footer>
    </main>
  );
}
