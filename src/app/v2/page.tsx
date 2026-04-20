import Hero from "@/components/v2/Hero";
import Mechanism from "@/components/v2/Mechanism";
import Evidence from "@/components/v2/Evidence";
import Partners from "@/components/v2/Partners";
import QualifierForm from "@/components/v2/QualifierForm";

export default function HomeV2() {
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

      {/* Divider */}
      <div style={{ width: "100%", maxWidth: "448px", marginLeft: "auto", marginRight: "auto", height: "1px", background: "linear-gradient(to right, transparent, rgba(249,115,22,0.2), transparent)" }} />

      <Mechanism />

      <div style={{ width: "100%", maxWidth: "448px", marginLeft: "auto", marginRight: "auto", height: "1px", background: "linear-gradient(to right, transparent, rgba(249,115,22,0.2), transparent)" }} />

      <Evidence />

      <div style={{ width: "100%", maxWidth: "448px", marginLeft: "auto", marginRight: "auto", height: "1px", background: "linear-gradient(to right, transparent, rgba(249,115,22,0.2), transparent)" }} />

      <Partners />

      <div style={{ width: "100%", maxWidth: "448px", marginLeft: "auto", marginRight: "auto", height: "1px", background: "linear-gradient(to right, transparent, rgba(249,115,22,0.2), transparent)" }} />

      <QualifierForm />

      {/* Footer */}
      <footer style={{ padding: "32px 0", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <p style={{ fontSize: "12px", color: "#78716c" }}>
          &copy; {new Date().getFullYear()} Reachflow. Tous droits réservés.
        </p>
      </footer>
    </main>
  );
}
