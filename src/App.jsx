import { useClinicalWorkflow } from './application/useClinicalWorkflow';
import AuditPanel from './components/AuditPanel';
import CashierPanel from './components/CashierPanel';
import ClinicPanel from './components/ClinicPanel';
import IgdPanel from './components/IgdPanel';
import ErDiagramPanel from './components/ErDiagramPanel';
import FlowTimeline from './components/FlowTimeline';
import ModulePage, { NextModuleButton } from './components/ModulePage';
import PharmacyPanel from './components/PharmacyPanel';
import QueuePanel from './components/QueuePanel';
import RegistrationForm from './components/RegistrationForm';
import StockPanel from './components/StockPanel';
import WorkbenchLayout from './components/WorkbenchLayout';

function App() {
  const workflow = useClinicalWorkflow();
  const {
    activeModule,
    activePatient,
    activeVisit,
    anamnesa,
    bills,
    clinicForm,
    currentIndex,
    handleCallNext,
    handlePayBill,
    handleRegister,
    handleRegisterIgd,
    handleSubmitClinic,
    handleValidatePrescription,
    igdForm,
    latestAnamnesa,
    latestPatient,
    medicines,
    patientsById,
    prescriptions,
    registrationForm,
    setActiveModule,
    setClinicForm,
    setIgdForm,
    setRegistrationForm,
    stats,
    visits,
    visitsById,
  } = workflow;

  const moduleContent = {
    erd: (
      <ModulePage
        eyebrow="Rancangan Data"
        title="Entity-Relationship MVP"
        description="Pisahkan data inti sesuai PRD: pasien, kunjungan, anamnesa, resep, dan tagihan. Semua entitas memakai UUID serta field JSONB untuk data medis fleksibel."
        actions={<NextModuleButton onClick={() => setActiveModule('pendaftaran')}>Ke Pendaftaran</NextModuleButton>}
      >
        <ErDiagramPanel />
      </ModulePage>
    ),
    igd: (
      <ModulePage
        eyebrow="Fase 2"
        title="IGD & Triage"
        description="Pendaftaran darurat dengan penilaian Triage (P1-P5). Data triage disimpan dalam field JSONB dan level triage diindeks untuk prioritas penanganan."
        actions={<NextModuleButton onClick={() => setActiveModule('pendaftaran')}>Ke Pendaftaran</NextModuleButton>}
      >
        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <IgdPanel
            form={igdForm}
            latestPatient={latestPatient}
            onFormChange={setIgdForm}
            onRegister={handleRegisterIgd}
          />
          <FlowTimeline currentIndex={currentIndex} />
        </div>
      </ModulePage>
    ),
    pendaftaran: (
      <ModulePage
        eyebrow="Modul 1"
        title="Pendaftaran Pasien"
        description="Catat demografi, alergi JSONB, tanda vital, nomor rekam medis, dan kunjungan awal tanpa meninggalkan halaman kerja modul."
        actions={<NextModuleButton onClick={() => setActiveModule('antrian')}>Ke Antrian</NextModuleButton>}
      >
        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <RegistrationForm
            form={registrationForm}
            latestPatient={latestPatient}
            onFormChange={setRegistrationForm}
            onRegister={handleRegister}
          />
          <FlowTimeline currentIndex={currentIndex} />
        </div>
      </ModulePage>
    ),
    antrian: (
      <ModulePage
        eyebrow="Modul 1"
        title="Plasma Antrian"
        description="Tampilan nomor antrian dan simulasi broadcast Socket.io. Setelah dipanggil, pasien bergerak menuju poliklinik."
        actions={<NextModuleButton onClick={() => setActiveModule('poliklinik')}>Ke Poliklinik</NextModuleButton>}
      >
        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <QueuePanel
            activeVisitId={activeVisit?.id}
            patientsById={patientsById}
            visits={visits}
            onCallNext={handleCallNext}
          />
          <FlowTimeline currentIndex={currentIndex} />
        </div>
      </ModulePage>
    ),
    poliklinik: (
      <ModulePage
        eyebrow="Modul 2"
        title="Poliklinik Dokter"
        description="Dokter mengisi keluhan, kode ICD-10, pemeriksaan fisik JSONB, lalu sistem membuat resep elektronik dan tagihan awal."
        actions={<NextModuleButton onClick={() => setActiveModule('farmasi')}>Ke Farmasi</NextModuleButton>}
      >
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <ClinicPanel
            activePatient={activePatient}
            activeVisit={activeVisit}
            clinicForm={clinicForm}
            latestAnamnesa={latestAnamnesa}
            onClinicChange={setClinicForm}
            onSubmitClinic={handleSubmitClinic}
          />
          <FlowTimeline currentIndex={currentIndex} />
        </div>
      </ModulePage>
    ),
    farmasi: (
      <ModulePage
        eyebrow="Modul 3"
        title="Farmasi"
        description="Apoteker memvalidasi resep. Stok obat berkurang dengan narasi transaction dan pessimistic locking sesuai PRD."
        actions={<NextModuleButton onClick={() => setActiveModule('kasir')}>Ke Kasir</NextModuleButton>}
      >
        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <PharmacyPanel
            medicines={medicines}
            patientsById={patientsById}
            prescriptions={prescriptions}
            visitsById={visitsById}
            onValidatePrescription={handleValidatePrescription}
          />
          <StockPanel medicines={medicines} />
        </div>
      </ModulePage>
    ),
    kasir: (
      <ModulePage
        eyebrow="Modul 4"
        title="Kasir"
        description="Kasir melihat snapshot harga decimal, menerima pembayaran, mencetak bukti, lalu mengubah status kunjungan menjadi selesai."
        actions={<NextModuleButton onClick={() => setActiveModule('audit')}>Ke Audit</NextModuleButton>}
      >
        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <CashierPanel bills={bills} patientsById={patientsById} visitsById={visitsById} onPayBill={handlePayBill} />
          <FlowTimeline currentIndex={currentIndex} />
        </div>
      </ModulePage>
    ),
    stok: (
      <ModulePage
        eyebrow="Back Office"
        title="Stok Farmasi"
        description="Ringkasan stok obat untuk membuktikan efek validasi resep tanpa database nyata."
        actions={<NextModuleButton onClick={() => setActiveModule('farmasi')}>Ke Farmasi</NextModuleButton>}
      >
        <StockPanel medicines={medicines} />
      </ModulePage>
    ),
    audit: (
      <ModulePage
        eyebrow="Kontrol Operasi"
        title="Audit Alur MVP"
        description="Jejak ringkas status kunjungan, anamnesa, resep, dan tagihan untuk memvalidasi alur antar modul."
        actions={<NextModuleButton onClick={() => setActiveModule('pendaftaran')}>Ulangi Alur</NextModuleButton>}
      >
        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <AuditPanel anamnesa={anamnesa} bills={bills} prescriptions={prescriptions} visits={visits} />
          <FlowTimeline currentIndex={currentIndex} />
        </div>
      </ModulePage>
    ),
  };

  return (
    <WorkbenchLayout activeModule={activeModule} stats={stats} onModuleChange={setActiveModule}>
      {moduleContent[activeModule]}
    </WorkbenchLayout>
  );
}

export default App;
