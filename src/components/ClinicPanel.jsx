import { FilePlus2, Stethoscope } from 'lucide-react';
import { icd10Options, statusTone } from '../data/mockData';

export default function ClinicPanel({
  activeVisit,
  activePatient,
  clinicForm,
  onClinicChange,
  onSubmitClinic,
  latestAnamnesa,
}) {
  const handleChange = (event) => {
    onClinicChange({ ...clinicForm, [event.target.name]: event.target.value });
  };

  return (
    <section id="poliklinik" className="panel panel-pad">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">Poliklinik</p>
          <h2 className="mt-1 text-lg font-bold">Anamnesa ICD-10</h2>
        </div>
        <Stethoscope size={22} className="text-clinic-teal" aria-hidden="true" />
      </div>

      <div className="mt-4 rounded-clinical border border-clinic-line bg-clinic-wash p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{activePatient?.namaLengkap ?? 'Belum ada kunjungan'}</p>
            <p className="mt-1 text-xs text-clinic-muted">No. {activeVisit?.nomorAntrian ?? '-'}</p>
          </div>
          <span className={`status-pill ${statusTone[activeVisit?.status] ?? 'border-slate-200 bg-white text-slate-600'}`}>
            {activeVisit?.status ?? '-'}
          </span>
        </div>
      </div>

      <form className="mt-4 grid gap-3" onSubmit={onSubmitClinic}>
        <div>
          <label className="label" htmlFor="kodeIcd10">
            Kode ICD-10
          </label>
          <select
            id="kodeIcd10"
            name="kodeIcd10"
            className="field mt-1"
            value={clinicForm.kodeIcd10}
            onChange={handleChange}
          >
            {icd10Options.map((item) => (
              <option key={item.kode} value={item.kode}>
                {item.kode} · {item.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="keluhanUtama">
            Keluhan utama
          </label>
          <textarea
            id="keluhanUtama"
            name="keluhanUtama"
            className="field mt-1 min-h-24 resize-none"
            value={clinicForm.keluhanUtama}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="pemeriksaanFisik">
            Pemeriksaan fisik JSONB
          </label>
          <textarea
            id="pemeriksaanFisik"
            name="pemeriksaanFisik"
            className="field mt-1 min-h-20 resize-none font-mono text-xs"
            value={clinicForm.pemeriksaanFisik}
            onChange={handleChange}
          />
        </div>
        <button className="btn-primary" type="submit" disabled={!activeVisit}>
          <FilePlus2 size={16} aria-hidden="true" />
          Simpan + Resep
        </button>
      </form>

      {latestAnamnesa ? (
        <div className="mt-4 rounded-clinical border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-900">
          <p className="font-semibold">{latestAnamnesa.kodeIcd10}</p>
          <p className="mt-1 line-clamp-2">{latestAnamnesa.keluhanUtama}</p>
        </div>
      ) : null}
    </section>
  );
}
