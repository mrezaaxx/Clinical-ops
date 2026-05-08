import { BellRing, MonitorUp } from 'lucide-react';
import { statusTone } from '../data/mockData';

export default function QueuePanel({ visits, patientsById, activeVisitId, onCallNext }) {
  const activeVisit = visits.find((visit) => visit.id === activeVisitId) ?? visits[0];
  const patient = activeVisit ? patientsById.get(activeVisit.pasienId) : null;

  return (
    <section id="antrian" className="panel panel-pad">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">Plasma Antrian</p>
          <h2 className="mt-1 text-lg font-bold">Nomor realtime</h2>
        </div>
        <MonitorUp size={22} className="text-clinic-teal" aria-hidden="true" />
      </div>

      <div className="mt-4 rounded-clinical bg-slate-950 p-4 text-white">
        <p className="text-xs font-semibold uppercase tracking-normal text-teal-200">Dipanggil</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <p className="text-6xl font-black leading-none">{activeVisit?.nomorAntrian ?? '-'}</p>
            <p className="mt-2 text-sm text-slate-300">{activeVisit?.kodePoli ?? '-'}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{patient?.namaLengkap ?? 'Belum ada pasien'}</p>
            <p className="mt-1 text-xs text-slate-400">Redis → Node.js → Plasma</p>
          </div>
        </div>
      </div>

      <button className="btn-primary mt-4 w-full" type="button" onClick={onCallNext} disabled={!activeVisit}>
        <BellRing size={16} aria-hidden="true" />
        Panggil Berikutnya
      </button>

      <div className="mt-4 space-y-2">
        {visits.slice(0, 4).map((visit) => {
          const rowPatient = patientsById.get(visit.pasienId);
          return (
            <div key={visit.id} className="flex items-center justify-between gap-3 rounded-clinical border border-clinic-line p-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {visit.nomorAntrian} · {rowPatient?.namaLengkap ?? 'Pasien baru'}
                </p>
                <p className="text-xs text-clinic-muted">{visit.kodePoli}</p>
              </div>
              <span className={`status-pill ${statusTone[visit.status] ?? 'border-slate-200 bg-white text-slate-600'}`}>
                {visit.status}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
