import { AlertTriangle, Plus } from 'lucide-react';

const defaultForm = {
  nik: '',
  namaLengkap: '',
  tanggalLahir: '',
  triageLevel: 'P3',
  keluhanUtama: '',
  tekananDarah: '120/80',
  suhu: '36.8',
  nadi: '82',
};

export default function IgdPanel({ form, onFormChange, onRegister, latestPatient }) {
  const value = { ...defaultForm, ...form };

  const handleChange = (event) => {
    onFormChange({ ...value, [event.target.name]: event.target.value });
  };

  const triageOptions = [
    { value: 'P1', label: 'P1 - Resusitasi (Merah)', color: 'bg-red-600 text-white' },
    { value: 'P2', label: 'P2 - Emergency (Kuning)', color: 'bg-yellow-500 text-black' },
    { value: 'P3', label: 'P3 - Urgent (Hijau)', color: 'bg-green-600 text-white' },
    { value: 'P4', label: 'P4 - Non Urgent (Biru)', color: 'bg-blue-600 text-white' },
    { value: 'P5', label: 'P5 - False Emergency (Putih)', color: 'bg-gray-100 text-black border border-gray-300' },
  ];

  return (
    <section id="igd" className="panel panel-pad">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label text-red-600">Fase 2: IGD</p>
          <h2 className="mt-1 text-lg font-bold uppercase tracking-tight">Instalasi Gawat Darurat</h2>
        </div>
        <AlertTriangle size={22} className="text-red-600 animate-pulse" aria-hidden="true" />
      </div>

      <form className="mt-4 grid gap-3" onSubmit={onRegister}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="nik">
              NIK
            </label>
            <input
              id="nik"
              name="nik"
              className="field mt-1"
              maxLength={16}
              inputMode="numeric"
              value={value.nik}
              onChange={handleChange}
              placeholder="327301..."
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="namaLengkap">
              Nama lengkap
            </label>
            <input
              id="namaLengkap"
              name="namaLengkap"
              className="field mt-1"
              value={value.namaLengkap}
              onChange={handleChange}
              placeholder="Nama pasien"
              required
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="tanggalLahir">
              Tanggal lahir
            </label>
            <input
              id="tanggalLahir"
              name="tanggalLahir"
              type="date"
              className="field mt-1"
              value={value.tanggalLahir}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="triageLevel">
              Level Triage
            </label>
            <select
              id="triageLevel"
              name="triageLevel"
              className={`field mt-1 font-bold ${triageOptions.find(o => o.value === value.triageLevel)?.color}`}
              value={value.triageLevel}
              onChange={handleChange}
            >
              {triageOptions.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-white text-black font-normal">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label" htmlFor="keluhanUtama">
            Keluhan Utama
          </label>
          <textarea
            id="keluhanUtama"
            name="keluhanUtama"
            className="field mt-1 min-h-[80px] py-2"
            value={value.keluhanUtama}
            onChange={handleChange}
            placeholder="Deskripsi kondisi darurat..."
            required
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="label text-[10px]">TD (mmHg)</label>
            <input
              name="tekananDarah"
              className="field mt-0.5"
              value={value.tekananDarah}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label text-[10px]">Suhu (°C)</label>
            <input name="suhu" className="field mt-0.5" value={value.suhu} onChange={handleChange} />
          </div>
          <div>
            <label className="label text-[10px]">Nadi (bpm)</label>
            <input name="nadi" className="field mt-0.5" value={value.nadi} onChange={handleChange} />
          </div>
        </div>

        <button className="btn-primary bg-red-600 hover:bg-red-700 mt-2" type="submit">
          <Plus size={16} aria-hidden="true" />
          Daftarkan IGD (Triage)
        </button>
      </form>

      {latestPatient?.noRm && (
        <div className="mt-4 rounded-clinical border border-red-200 bg-red-50 p-3 text-sm">
          <p className="font-bold text-red-900">TERDAFTAR IGD: {latestPatient.noRm}</p>
          <p className="mt-1 text-red-800">{latestPatient.namaLengkap}</p>
        </div>
      )}
    </section>
  );
}
