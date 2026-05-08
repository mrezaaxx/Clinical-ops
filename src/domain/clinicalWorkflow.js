export function buildNoRm(count, year = new Date().getFullYear()) {
  return `RM-${year}-${String(count + 1).padStart(4, '0')}`;
}

export function parseList(value = '') {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function nextQueueNumber(visits, kodePoli) {
  const maxQueue = visits
    .filter((visit) => visit.kodePoli === kodePoli)
    .reduce((max, visit) => Math.max(max, visit.nomorAntrian), 0);

  return maxQueue + 1;
}

export function createPatientVisit({ form, now = new Date(), patientCount, uuid = crypto.randomUUID, visits }) {
  const patient = {
    id: uuid(),
    noRm: buildNoRm(patientCount, now.getFullYear()),
    nik: form.nik,
    namaLengkap: form.namaLengkap,
    tanggalLahir: form.tanggalLahir,
    riwayatAlergi: parseList(form.alergi),
  };

  const visit = {
    id: uuid(),
    pasienId: patient.id,
    kodePoli: form.kodePoli,
    nomorAntrian: nextQueueNumber(visits, form.kodePoli),
    status: 'MENUNGGU',
    tandaVital: {
      tekananDarah: form.tekananDarah,
      suhu: form.suhu,
      nadi: Number(form.nadi),
    },
    createdAt: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
  };

  return { patient, visit };
}

export function createClinicalBundle({ clinicForm, visitId, uuid = crypto.randomUUID }) {
  return {
    record: {
      id: uuid(),
      kunjunganId: visitId,
      kodeIcd10: clinicForm.kodeIcd10,
      keluhanUtama: clinicForm.keluhanUtama,
      pemeriksaanFisik: clinicForm.pemeriksaanFisik,
    },
    prescription: {
      id: uuid(),
      kunjunganId: visitId,
      status: 'MENUNGGU',
      keterangan: 'Resep elektronik dari poliklinik',
      detail: [
        { kodeObat: 'OBT-PCM', nama: 'Paracetamol 500 mg', jumlah: 6, aturanPakai: '3x1 setelah makan' },
        { kodeObat: 'OBT-ORS', nama: 'Oralit', jumlah: 2, aturanPakai: 'Saat perlu' },
      ],
    },
    bill: {
      id: uuid(),
      kunjunganId: visitId,
      status: 'BELUM',
      totalBiaya: 185000,
      detail: [
        { namaItem: 'Konsultasi Dokter Umum', hargaSatuan: 120000, jumlah: 1, subtotal: 120000 },
        { namaItem: 'Administrasi Klinik', hargaSatuan: 25000, jumlah: 1, subtotal: 25000 },
        { namaItem: 'Obat Resep', hargaSatuan: 40000, jumlah: 1, subtotal: 40000 },
      ],
    },
  };
}
