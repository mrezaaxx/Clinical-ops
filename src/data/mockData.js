export const initialPatients = [
  {
    id: crypto.randomUUID(),
    noRm: 'RM-2026-0001',
    nik: '3273010705900001',
    namaLengkap: 'Siti Rahmawati',
    tanggalLahir: '1990-05-07',
    riwayatAlergi: ['Penisilin'],
  },
  {
    id: crypto.randomUUID(),
    noRm: 'RM-2026-0002',
    nik: '3273011208840003',
    namaLengkap: 'Ahmad Fauzan',
    tanggalLahir: '1984-08-12',
    riwayatAlergi: ['Debu', 'Udang'],
  },
];

export const initialVisits = [
  {
    id: crypto.randomUUID(),
    pasienId: null,
    kodePoli: 'UMUM',
    nomorAntrian: 12,
    status: 'MENUNGGU',
    tandaVital: { tekananDarah: '120/80', suhu: '36.8', nadi: 82 },
    createdAt: '08:20',
  },
];

export const initialMedicines = [
  { kodeObat: 'OBT-PCM', nama: 'Paracetamol 500 mg', stok: 42, satuan: 'tablet' },
  { kodeObat: 'OBT-CTM', nama: 'CTM 4 mg', stok: 24, satuan: 'tablet' },
  { kodeObat: 'OBT-ORS', nama: 'Oralit', stok: 18, satuan: 'sachet' },
];

export const icd10Options = [
  { kode: 'J00', label: 'Common cold' },
  { kode: 'K29.7', label: 'Gastritis' },
  { kode: 'I10', label: 'Hipertensi esensial' },
  { kode: 'E11.9', label: 'Diabetes tanpa komplikasi' },
];

export const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

export const statusTone = {
  MENUNGGU: 'border-amber-200 bg-amber-50 text-amber-700',
  DIPANGGIL: 'border-sky-200 bg-sky-50 text-sky-700',
  DIPERIKSA: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  RESEP: 'border-violet-200 bg-violet-50 text-violet-700',
  FARMASI: 'border-teal-200 bg-teal-50 text-teal-700',
  TAGIHAN: 'border-orange-200 bg-orange-50 text-orange-700',
  SELESAI: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  LUNAS: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  BELUM: 'border-rose-200 bg-rose-50 text-rose-700',
};
