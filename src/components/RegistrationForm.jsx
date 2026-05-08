import { Plus, UserRoundPlus } from 'lucide-react';

const defaultForm = {
  nik: '',
  namaLengkap: '',
  tanggalLahir: '',
  kodePoli: 'UMUM',
  alergi: '',
  tekananDarah: '120/80',
  suhu: '36.8',
  nadi: '82',
};

export default function RegistrationForm({ form, onFormChange, onRegister, latestPatient }) {
  const value = { ...defaultForm, ...form };

  const handleChange = (event) => {
    onFormChange({ ...value, [event.target.name]: event.target.value });
  };

  return (
    <section id="pendaftaran" className="panel panel-pad">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">Pendaftaran</p>
          <h2 className="mt-1 text-lg font-bold">Rekam pasien baru</h2>
        </div>
        <UserRoundPlus size={22} className="text-clinic-teal" aria-hidden="true" />
      </div>

      <form className="mt-4 grid gap-3" onSubmit={onRegister}>
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
            <label className="label" htmlFor="kodePoli">
              Kode poli
            </label>
            <select id="kodePoli" name="kodePoli" className="field mt-1" value={value.kodePoli} onChange={handleChange}>
              <option value="UMUM">UMUM</option>
              <option value="GIGI">GIGI</option>
              <option value="ANAK">ANAK</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label" htmlFor="alergi">
            Riwayat alergi JSONB
          </label>
          <input
            id="alergi"
            name="alergi"
            className="field mt-1"
            value={value.alergi}
            onChange={handleChange}
            placeholder="Penisilin, debu"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            name="tekananDarah"
            aria-label="Tekanan darah"
            className="field"
            value={value.tekananDarah}
            onChange={handleChange}
          />
          <input name="suhu" aria-label="Suhu" className="field" value={value.suhu} onChange={handleChange} />
          <input name="nadi" aria-label="Nadi" className="field" value={value.nadi} onChange={handleChange} />
        </div>
        <button className="btn-primary" type="submit">
          <Plus size={16} aria-hidden="true" />
          Daftar + Kunjungan
        </button>
      </form>

      {latestPatient ? (
        <div className="mt-4 rounded-clinical border border-teal-200 bg-teal-50 p-3 text-sm">
          <p className="font-semibold text-teal-900">{latestPatient.noRm}</p>
          <p className="mt-1 text-teal-800">{latestPatient.namaLengkap}</p>
        </div>
      ) : null}
    </section>
  );
}
