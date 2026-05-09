import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Fitur", "Alur Sistem", "Integrasi", "Hubungi Kami"];

const FEATURES = [
  {
    icon: "🏥",
    modul: "Pendaftaran & Antrian",
    desc: "Registrasi pasien baru dengan nomor rekam medis unik. Plasma antrian realtime via Socket.io.",
    tags: ["UUID RM", "Realtime", "Plasma Display"],
  },
  {
    icon: "🩺",
    modul: "Poliklinik",
    desc: "Input anamnesa dokter dengan kode diagnosa ICD-10. Resep elektronik langsung ke farmasi.",
    tags: ["ICD-10", "Rekam Medis", "E-Resep"],
  },
  {
    icon: "💊",
    modul: "Farmasi",
    desc: "Validasi resep apoteker dengan pengurangan stok otomatis. Race condition dicegah dengan pessimistic locking.",
    tags: ["Stok Otomatis", "Validasi Resep"],
  },
  {
    icon: "🧾",
    modul: "Kasir & Billing",
    desc: "Penggabungan seluruh tagihan medis. Pencegahan double payment dengan database transaction.",
    tags: ["Presisi Desimal", "Anti Double Bayar"],
  },
  {
    icon: "🏨",
    modul: "Rawat Inap",
    desc: "Manajemen kamar dan bangsal. Monitoring status bed realtime untuk seluruh unit.",
    tags: ["Manajemen Kamar", "Bed Monitoring"],
  },
  {
    icon: "🔬",
    modul: "Laboratorium & Radiologi",
    desc: "Input hasil pemeriksaan lab dan radiologi langsung terintegrasi ke rekam medis pasien.",
    tags: ["Hasil Lab", "PACS Ready"],
  },
  {
    icon: "📦",
    modul: "Gudang & Pengadaan",
    desc: "Pantau pergerakan stok alat medis dan obat. Peringatan otomatis saat stok kritis.",
    tags: ["Stok Kritis", "Pengadaan"],
  },
  {
    icon: "📊",
    modul: "Laporan & Dashboard",
    desc: "Rekapitulasi kunjungan, pendapatan, dan kinerja unit. Ekspor laporan siap audit.",
    tags: ["Ekspor PDF", "Dashboard Eksekutif"],
  },
];

const FLOW_STEPS = [
  { label: "Pendaftaran", sub: "Pasien datang, input data & cetak nomor antrian", color: "#0ea5e9" },
  { label: "Plasma Antrian", sub: "Nomor dipanggil realtime di layar display", color: "#6366f1" },
  { label: "Poliklinik", sub: "Dokter periksa, input diagnosa & resep", color: "#10b981" },
  { label: "Farmasi", sub: "Apoteker validasi & siapkan obat", color: "#f59e0b" },
  { label: "Kasir", sub: "Tagihan otomatis terkumpul, pasien bayar", color: "#ef4444" },
  { label: "Selesai", sub: "Status kunjungan update, data tersimpan", color: "#8b5cf6" },
];

const INTEGRATIONS = [
  { name: "BPJS Kesehatan", desc: "Klaim BPJS terintegrasi langsung dari sistem", icon: "🛡️" },
  { name: "SatuSehat", desc: "Kirim data ke platform nasional Kemenkes", icon: "🏛️" },
  { name: "Socket.io", desc: "Antrian realtime tanpa reload halaman", icon: "⚡" },
  { name: "PostgreSQL", desc: "Database handal dengan replikasi otomatis", icon: "🗄️" },
];

const STATS = [
  { value: "8+", label: "Rumah Sakit Aktif" },
  { value: "5", label: "Modul Terintegrasi" },
  { value: "3.5th", label: "Pengalaman SIMRS" },
  { value: "99%", label: "Uptime Target" },
];

export default function LandingPage() {
  const [activeNav, setActiveNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [e.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-observe]").forEach((el) => {
      observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#f8fafc", color: "#0f172a", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .nav-link { font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #0ea5e9; }

        .btn-primary {
          background: #0ea5e9;
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .btn-primary:hover { background: #0284c7; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(14,165,233,0.35); }

        .btn-outline {
          background: transparent;
          color: #0ea5e9;
          border: 1.5px solid #0ea5e9;
          padding: 11px 24px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .btn-outline:hover { background: #f0f9ff; }

        .feature-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 28px;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #0ea5e9, #6366f1);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s;
        }
        .feature-card:hover { border-color: #bae6fd; box-shadow: 0 8px 32px rgba(14,165,233,0.12); transform: translateY(-3px); }
        .feature-card:hover::before { transform: scaleX(1); }

        .tag { display: inline-block; background: #f0f9ff; color: #0284c7; border-radius: 99px; padding: 3px 10px; font-size: 11px; font-weight: 600; margin: 3px 3px 0 0; }

        .flow-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
          position: relative;
        }
        .flow-step + .flow-step::before {
          content: '→';
          position: absolute;
          left: -16px;
          top: 20px;
          color: #94a3b8;
          font-size: 18px;
        }

        .stat-card { text-align: center; }
        .stat-value { font-family: 'DM Serif Display', serif; font-size: 48px; color: #0ea5e9; line-height: 1; }
        .stat-label { font-size: 14px; color: #64748b; margin-top: 6px; font-weight: 500; }

        .integration-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: all 0.2s;
        }
        .integration-card:hover { border-color: #bae6fd; box-shadow: 0 4px 20px rgba(14,165,233,0.1); }

        .section-fade { opacity: 0; transform: translateY(24px); transition: all 0.6s ease; }
        .section-fade.visible { opacity: 1; transform: none; }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          color: #0284c7;
          padding: 6px 16px;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .pulse { width: 8px; height: 8px; background: #0ea5e9; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .mockup-window {
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .mockup-bar {
          background: #f1f5f9;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid #e2e8f0;
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; }

        .queue-number {
          font-family: 'DM Serif Display', serif;
          font-size: 72px;
          color: #0ea5e9;
          text-align: center;
          line-height: 1;
        }
        .queue-blink { animation: blink 1.5s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr !important; }
          .flow-wrap { flex-direction: column !important; }
          .flow-step + .flow-step::before { content: '↓'; left: 50%; top: -18px; transform: translateX(-50%); }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .integrations-grid { grid-template-columns: 1fr !important; }
        }

        .contact-form input, .contact-form textarea, .contact-form select {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          color: #0f172a;
          background: white;
          transition: border-color 0.2s;
          outline: none;
        }
        .contact-form input:focus, .contact-form textarea:focus, .contact-form select:focus { border-color: #0ea5e9; }
        .contact-form label { font-size: 13px; font-weight: 600; color: #475569; display: block; margin-bottom: 6px; }
        .form-group { margin-bottom: 16px; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(248,250,252,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e2e8f0" : "none",
        transition: "all 0.3s",
        padding: "0 24px"
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "#0ea5e9", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏥</div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#0f172a" }}>Clinical<span style={{ color: "#0ea5e9" }}>Ops</span></span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="nav-link" style={{ display: window.innerWidth < 768 ? "none" : undefined }}>{l}</a>
            ))}
            <button className="btn-primary" style={{ padding: "8px 20px", fontSize: 14 }}
              onClick={() => document.getElementById("hubungi-kami").scrollIntoView({ behavior: "smooth" })}>
              Minta Demo
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, background: "linear-gradient(160deg, #f0f9ff 0%, #f8fafc 60%, #faf5ff 100%)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <span className="pulse"></span>
                Sistem Informasi Manajemen RS
              </div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(36px, 5vw, 58px)", lineHeight: 1.15, color: "#0f172a", marginBottom: 20 }}>
                SIMRS Lengkap,<br />
                <span style={{ color: "#0ea5e9" }}>Satu Platform.</span>
              </h1>
              <p style={{ fontSize: 18, color: "#475569", lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
                Dari pendaftaran pasien hingga laporan keuangan — semua unit terintegrasi. Terintegrasi BPJS Kesehatan & SatuSehat Kemenkes.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => document.getElementById("hubungi-kami").scrollIntoView({ behavior: "smooth" })}>
                  Jadwalkan Demo →
                </button>
                <button className="btn-outline" onClick={() => document.getElementById("fitur").scrollIntoView({ behavior: "smooth" })}>
                  Lihat Fitur
                </button>
              </div>
              <div style={{ display: "flex", gap: 24, marginTop: 40, flexWrap: "wrap" }}>
                {[["8+", "RS Aktif"], ["5 Fase", "Modul"], ["BPJS", "Terintegrasi"]].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>{v}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* MOCKUP */}
            <div style={{ perspective: 1000 }}>
              <div className="mockup-window" style={{ transform: "rotateY(-4deg) rotateX(2deg)" }}>
                <div className="mockup-bar">
                  <div className="dot" style={{ background: "#ef4444" }}></div>
                  <div className="dot" style={{ background: "#f59e0b" }}></div>
                  <div className="dot" style={{ background: "#10b981" }}></div>
                  <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>Plasma Antrian — Poli Umum</div>
                </div>
                <div style={{ padding: 32, background: "#0f172a" }}>
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8, letterSpacing: 2, textTransform: "uppercase" }}>Nomor Antrian</div>
                    <div className="queue-number queue-blink">A-047</div>
                    <div style={{ fontSize: 14, color: "#64748b", marginTop: 8 }}>Poli Umum — dr. Budi Santoso</div>
                  </div>
                  <div style={{ borderTop: "1px solid #1e293b", paddingTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["Menunggu", "12", "#f59e0b"], ["Dipanggil", "3", "#0ea5e9"], ["Selesai", "31", "#10b981"], ["Skip", "1", "#ef4444"]].map(([l, v, c]) => (
                      <div key={l} style={{ background: "#1e293b", borderRadius: 8, padding: "12px 16px" }}>
                        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{l}</div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: c }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, background: "#1e293b", borderRadius: 8, padding: "12px 16px" }}>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Antrian Berikutnya</div>
                    {[["A-048", "Siti Rahayu", "Menunggu"], ["A-049", "Ahmad Fauzi", "Menunggu"]].map(([no, name, status]) => (
                      <div key={no} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #0f172a" }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8" }}>{no}</span>
                          <span style={{ fontSize: 13, color: "#cbd5e1" }}>{name}</span>
                        </div>
                        <span style={{ fontSize: 11, color: "#f59e0b", background: "#422006", padding: "2px 8px", borderRadius: 99 }}>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#0f172a", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {STATS.map(({ value, label }) => (
              <div key={label} className="stat-card">
                <div className="stat-value">{value}</div>
                <div className="stat-label" style={{ color: "#64748b" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="fitur" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div id="sec-features" data-observe className={`section-fade${visibleSections["sec-features"] ? " visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0ea5e9", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Modul Lengkap</div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 42px)", color: "#0f172a", marginBottom: 16 }}>Semua Unit, Satu Sistem</h2>
            <p style={{ fontSize: 16, color: "#64748b", maxWidth: 560, margin: "0 auto" }}>Dari front-office hingga back-office, setiap alur kerja RS tercakup dalam satu platform terintegrasi.</p>
          </div>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {FEATURES.map(({ icon, modul, desc, tags }, i) => (
              <div key={modul} className="feature-card section-fade" id={`feat-${i}`} data-observe style={{ animationDelay: `${i * 60}ms`, ...(visibleSections[`feat-${i}`] ? { opacity: 1, transform: "none" } : {}) }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{modul}</div>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 12 }}>{desc}</p>
                <div>{tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALUR SISTEM */}
      <section id="alur-sistem" style={{ padding: "96px 24px", background: "#f1f5f9" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0ea5e9", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Alur Kerja</div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 42px)", color: "#0f172a" }}>Dari Pasien Datang Hingga Pulang</h2>
          </div>
          <div className="flow-wrap" style={{ display: "flex", gap: 8, alignItems: "flex-start", position: "relative", flexWrap: "wrap" }}>
            {FLOW_STEPS.map(({ label, sub, color }, i) => (
              <div key={label} className="flow-step" style={{ position: "relative" }}>
                {i > 0 && <div style={{ position: "absolute", left: -20, top: 22, color: "#94a3b8", fontSize: 20, display: "flex" }}>→</div>}
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 16, boxShadow: `0 4px 16px ${color}44` }}>
                  {i + 1}
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5, maxWidth: 120 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRASI */}
      <section id="integrasi" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0ea5e9", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Integrasi</div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 42px)", color: "#0f172a" }}>Terhubung ke Ekosistem Kesehatan</h2>
          </div>
          <div className="integrations-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {INTEGRATIONS.map(({ name, desc, icon }) => (
              <div key={name} className="integration-card">
                <div style={{ fontSize: 28, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{name}</div>
                  <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="hubungi-kami" style={{ padding: "96px 24px", background: "#0f172a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 42px)", color: "white", marginBottom: 16 }}>Siap Digitalisasi RS Anda?</h2>
            <p style={{ fontSize: 16, color: "#64748b", maxWidth: 480, margin: "0 auto" }}>Hubungi kami untuk demo langsung. Tim kami siap membantu proses implementasi dari awal hingga go-live.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            {/* FORM */}
            <div className="contact-form">
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" placeholder="dr. Ahmad / Bapak Direktur..." />
              </div>
              <div className="form-group">
                <label>Nama RS / Klinik</label>
                <input type="text" placeholder="RS Harapan Bunda..." />
              </div>
              <div className="form-group">
                <label>Nomor WhatsApp</label>
                <input type="tel" placeholder="08xxxxxxxxxx" />
              </div>
              <div className="form-group">
                <label>Skala Fasilitas</label>
                <select>
                  <option>Pilih skala RS</option>
                  <option>Klinik Pratama</option>
                  <option>RS Tipe D</option>
                  <option>RS Tipe C</option>
                  <option>RS Tipe B / A</option>
                </select>
              </div>
              <div className="form-group">
                <label>Kebutuhan Khusus</label>
                <textarea rows={3} placeholder="Modul yang dibutuhkan, jumlah user, integrasi BPJS..."></textarea>
              </div>
              <button className="btn-primary" style={{ width: "100%", padding: "14px" }}>
                Kirim via WhatsApp →
              </button>
            </div>

            {/* INFO */}
            <div>
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0ea5e9", marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>Kenapa memilih kami?</div>
                {[
                  ["✅", "Pengalaman 3.5 tahun di 8+ RS aktif"],
                  ["✅", "Implementasi didampingi hingga go-live"],
                  ["✅", "Integrasi BPJS & SatuSehat siap pakai"],
                  ["✅", "Support teknis langsung dari developer"],
                  ["✅", "Kustomisasi sesuai alur kerja RS Anda"],
                ].map(([ic, t]) => (
                  <div key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                    <span style={{ fontSize: 16 }}>{ic}</span>
                    <span style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "#1e293b", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>Kontak Langsung</div>
                <div style={{ fontSize: 15, color: "white", fontWeight: 600 }}>Muhammad Reza</div>
                <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>Fullstack Developer — Terakorp Indonesia</div>
                <a href="https://wa.me/62" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, background: "#16a34a", color: "white", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
                  💬 Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#020617", padding: "24px", textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "#334155" }}>
          © 2026 ClinicalOps · SIMRS by Muhammad Reza · Bandung, Indonesia
        </div>
      </footer>
    </div>
  );
}