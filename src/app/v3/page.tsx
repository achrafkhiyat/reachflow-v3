import Hero from "@/components/v3/Hero";
import QualifierForm from "@/components/v3/QualifierForm";

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

      {/* How it works — 3 steps */}
      <section
        style={{
          padding: "36px 20px 32px",
          maxWidth: "560px",
          marginLeft: "auto",
          marginRight: "auto",
          cursor: "default",
          userSelect: "none",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "#a8a29e",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Comment ça marche
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            { n: "1", text: "On analyse votre situation en 30 min" },
            { n: "2", text: "On installe votre Moteur de Filtration en 2 semaines" },
            { n: "3", text: "Vous recevez uniquement des familles qualifiées" },
          ].map(({ n, text }, i, arr) => (
            <div key={n} style={{ display: "flex", alignItems: "stretch", gap: "16px" }}>
              {/* Line + circle */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(249,115,22,0.12)",
                    border: "1px solid rgba(249,115,22,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#F97316",
                    flexShrink: 0,
                  }}
                >
                  {n}
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: "1px", flex: 1, minHeight: "20px", background: "linear-gradient(to bottom, rgba(249,115,22,0.25), rgba(249,115,22,0.05))", margin: "4px 0" }} />
                )}
              </div>
              {/* Text */}
              <div style={{ paddingBottom: i < arr.length - 1 ? "20px" : "0", paddingTop: "5px" }}>
                <p style={{ color: "#d6d3d1", fontSize: "clamp(0.85rem, 3.5vw, 0.975rem)", lineHeight: 1.5, margin: 0 }}>
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
