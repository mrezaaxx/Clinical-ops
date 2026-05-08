import { LockKeyhole, Pill, ShieldCheck } from 'lucide-react';
import { statusTone } from '../data/mockData';

export default function PharmacyPanel({ prescriptions, visitsById, patientsById, medicines, onValidatePrescription }) {
  const pending = prescriptions.find((item) => item.status !== 'VALID') ?? prescriptions[0];
  const visit = pending ? visitsById.get(pending.kunjunganId) : null;
  const patient = visit ? patientsById.get(visit.pasienId) : null;

  return (
    <section id="farmasi" className="panel panel-pad">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">Farmasi</p>
          <h2 className="mt-1 text-lg font-bold">Validasi resep</h2>
        </div>
        <Pill size={22} className="text-clinic-teal" aria-hidden="true" />
      </div>

      <div className="mt-4 rounded-clinical border border-clinic-line bg-clinic-wash p-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <LockKeyhole size={14} aria-hidden="true" />
          Simulasi lockForUpdate + transaction
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {pending ? (
          <article className="rounded-clinical border border-clinic-line p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{patient?.namaLengkap ?? 'Pasien'}</p>
                <p className="mt-1 text-xs text-clinic-muted">{pending.keterangan}</p>
              </div>
              <span className={`status-pill ${statusTone[pending.status] ?? 'border-slate-200 bg-white text-slate-600'}`}>
                {pending.status}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              {pending.detail.map((row) => (
                <div key={row.kodeObat} className="flex items-center justify-between gap-3 rounded-clinical bg-slate-50 px-3 py-2 text-sm">
                  <span className="truncate">{row.nama}</span>
                  <span className="font-semibold">{row.jumlah}</span>
                </div>
              ))}
            </div>
            <button
              className="btn-primary mt-3 w-full"
              type="button"
              onClick={() => onValidatePrescription(pending.id)}
              disabled={pending.status === 'VALID'}
            >
              <ShieldCheck size={16} aria-hidden="true" />
              Validasi Resep
            </button>
          </article>
        ) : (
          <p className="rounded-clinical border border-clinic-line p-3 text-sm text-clinic-muted">Belum ada resep.</p>
        )}
      </div>

      <div className="mt-4">
        <p className="label">Stok obat</p>
        <div className="mt-2 grid gap-2">
          {medicines.map((medicine) => (
            <div key={medicine.kodeObat} className="flex items-center justify-between gap-3 text-sm">
              <span className="truncate">{medicine.nama}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                {medicine.stok} {medicine.satuan}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
