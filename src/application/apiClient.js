const BASE_URL = 'http://localhost:8000/api';

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'API request failed');
  }

  return result.data ?? result;
}

export const apiClient = {
  getPatients: () => request('/pasien'),
  getVisits: () => request('/kunjungan'),
  getMedicines: () => request('/obat'),
  getAnamnesas: () => request('/anamnesa'),
  getPrescriptions: () => request('/resep'),
  getBills: () => request('/tagihan'),

  callVisit: (visitId) => request(`/kunjungan/${visitId}/panggil`, { method: 'POST' }),
  registerPatient: (data) => request('/pendaftaran/pasien', { method: 'POST', body: JSON.stringify(data) }),
  registerIgd: (data) => request('/igd/pasien', { method: 'POST', body: JSON.stringify(data) }),
  saveAnamnesa: (data) => request('/poliklinik/anamnesa', { method: 'POST', body: JSON.stringify(data) }),
  validatePrescription: (resepId) => request(`/farmasi/resep/${resepId}/validasi`, { method: 'POST' }),
  payBill: (tagihanId) => request(`/kasir/tagihan/${tagihanId}/bayar`, { method: 'POST' }),
};
