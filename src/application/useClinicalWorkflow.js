import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { apiClient } from './apiClient';

const SOCKET_URL = `${window.location.protocol}//${window.location.hostname}:3000`;

const registrationDefaults = {
  nik: '3273010705260004',
  namaLengkap: 'Dewi Kartika',
  tanggalLahir: '1996-02-14',
  kodePoli: 'UMUM',
  alergi: 'Lateks',
  tekananDarah: '118/78',
  suhu: '36.6',
  nadi: '79',
};

const igdDefaults = {
  nik: '3273010705269999',
  namaLengkap: 'Pasien Gawat',
  tanggalLahir: '1990-01-01',
  triageLevel: 'P1',
  keluhanUtama: 'Nyeri dada hebat dan sesak napas.',
  tekananDarah: '160/100',
  suhu: '37.5',
  nadi: '110',
};

const clinicDefaults = {
  kodeIcd10: 'J00',
  keluhanUtama: 'Demam ringan, pilek, dan nyeri tenggorokan sejak dua hari.',
  pemeriksaanFisik: '{ "faring": "hiperemis", "paru": "vesikuler", "kesadaran": "compos mentis" }',
};

const nextStatusIndex = {
  MENUNGGU: 1,
  DIPANGGIL: 1,
  DIPERIKSA: 2,
  RESEP: 3,
  FARMASI: 4,
  TAGIHAN: 4,
  SELESAI: 5,
};

export function useClinicalWorkflow() {
  const [patients, setPatients] = useState([]);
  const [visits, setVisits] = useState([]);
  const [anamnesa, setAnamnesa] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [bills, setBills] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [activeVisitId, setActiveVisitId] = useState(null);
  const [activeModule, setActiveModule] = useState('pendaftaran');
  const [registrationForm, setRegistrationForm] = useState(registrationDefaults);
  const [igdForm, setIgdForm] = useState(igdDefaults);
  const [clinicForm, setClinicForm] = useState(clinicDefaults);

  const refreshData = async () => {
    try {
      const [p, v, m, a, pr, b] = await Promise.all([
        apiClient.getPatients(),
        apiClient.getVisits(),
        apiClient.getMedicines(),
        apiClient.getAnamnesas(),
        apiClient.getPrescriptions(),
        apiClient.getBills(),
      ]);
      setPatients(p);
      setVisits(v);
      setMedicines(m);
      setAnamnesa(a);
      setPrescriptions(pr);
      setBills(b);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  useEffect(() => {
    refreshData();

    const socket = io(SOCKET_URL);
    socket.on('queue-update', (data) => {
      console.log('Realtime update received:', data);
      refreshData();
      
      if (data.type === 'CALL_NEXT') {
        setActiveVisitId(data.visit.id);
      }
    });

    return () => socket.disconnect();
  }, []);

  const patientsById = useMemo(() => new Map(patients.map((p) => [p.id, p])), [patients]);
  const visitsById = useMemo(() => new Map(visits.map((v) => [v.id, v])), [visits]);
  const activeVisit = visitsById.get(activeVisitId) ?? visits[0];
  const activePatient = activeVisit ? patientsById.get(activeVisit.pasien_id || activeVisit.pasienId) : null;
  const latestPatient = patients[patients.length - 1];
  const latestAnamnesa = anamnesa[anamnesa.length - 1];
  const currentIndex = activeVisit ? nextStatusIndex[activeVisit.status] ?? 0 : 0;

  const stats = [
    { label: 'Pasien', value: patients.length },
    { label: 'Antrian', value: visits.filter((v) => v.status !== 'SELESAI').length },
    { label: 'Resep', value: prescriptions.length },
    { label: 'Tagihan', value: bills.filter((b) => b.status !== 'LUNAS').length },
  ];

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const { pasien, kunjungan } = await apiClient.registerPatient({
        nik: registrationForm.nik,
        nama_lengkap: registrationForm.namaLengkap,
        tanggal_lahir: registrationForm.tanggalLahir,
        kode_poli: registrationForm.kodePoli,
        riwayat_alergi: registrationForm.alergi.split(',').map((s) => s.trim()).filter(Boolean),
        tanda_vital: {
          tekanan_darah: registrationForm.tekananDarah,
          suhu: registrationForm.suhu,
          nadi: registrationForm.nadi,
        },
      });

      await refreshData();
      setActiveVisitId(kunjungan.id);
      setActiveModule('antrian');
    } catch (error) {
      alert('Pendaftaran gagal: ' + error.message);
    }
  };

  const handleRegisterIgd = async (event) => {
    event.preventDefault();
    try {
      const { pasien, kunjungan } = await apiClient.registerIgd({
        nik: igdForm.nik,
        nama_lengkap: igdForm.namaLengkap,
        tanggal_lahir: igdForm.tanggalLahir,
        triage_level: igdForm.triageLevel,
        triage_detail: {
          keluhan_utama: igdForm.keluhanUtama,
        },
        tanda_vital: {
          tekanan_darah: igdForm.tekananDarah,
          suhu: igdForm.suhu,
          nadi: igdForm.nadi,
        },
      });

      await refreshData();
      setActiveVisitId(kunjungan.id);
      setActiveModule('antrian');
    } catch (error) {
      alert('Pendaftaran IGD gagal: ' + error.message);
    }
  };

  const handleCallNext = async () => {
    const candidate = visits.find((v) => v.status === 'MENUNGGU') ?? activeVisit;
    if (!candidate) return;

    try {
      await apiClient.callVisit(candidate.id);
      await refreshData();
      setActiveVisitId(candidate.id);
      setActiveModule('poliklinik');
    } catch (error) {
      alert('Panggil antrian gagal: ' + error.message);
    }
  };

  const handleSubmitClinic = async (event) => {
    event.preventDefault();
    if (!activeVisit) return;

    try {
      await apiClient.saveAnamnesa({
        kunjungan_id: activeVisit.id,
        kode_icd10: clinicForm.kodeIcd10,
        keluhan_utama: clinicForm.keluhanUtama,
        pemeriksaan_fisik: JSON.parse(clinicForm.pemeriksaanFisik),
        resep: [
          { kode_obat: 'OBT-PCM', jumlah: 6, aturan_pakai: '3x1 setelah makan' },
          { kode_obat: 'OBT-ORS', jumlah: 2, aturan_pakai: 'Saat perlu' },
        ],
        tagihan: [
          { nama_item: 'Konsultasi Dokter Umum', harga_satuan: 120000, jumlah: 1 },
          { nama_item: 'Administrasi Klinik', harga_satuan: 25000, jumlah: 1 },
          { nama_item: 'Obat Resep', harga_satuan: 40000, jumlah: 1 },
        ],
      });

      await refreshData();
      setActiveModule('farmasi');
    } catch (error) {
      alert('Simpan anamnesa gagal: ' + error.message);
    }
  };

  const handleValidatePrescription = async (prescriptionId) => {
    try {
      await apiClient.validatePrescription(prescriptionId);
      await refreshData();
      setActiveModule('kasir');
    } catch (error) {
      alert('Validasi resep gagal: ' + error.message);
    }
  };

  const handlePayBill = async (billId) => {
    try {
      await apiClient.payBill(billId);
      await refreshData();
      setActiveModule('audit');
    } catch (error) {
      alert('Pembayaran gagal: ' + error.message);
    }
  };

  return {
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
  };
}
