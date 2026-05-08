import { ClipboardList } from 'lucide-react';

export default function AuditPanel({ anamnesa, bills, prescriptions, visits }) {
  const events = [
    ...visits.map((visit) => ({
      id: `visit-${visit.id}`,
      title: `Kunjungan ${visit.nomorAntrian}`,
      detail: `${visit.kodePoli} · ${visit.status}`,
    })),
    ...anamnesa.map((item) => ({ id: `anamnesa-${item.id}`, title: 'Anamnesa disimpan', detail: item.kodeIcd10 })),
    ...prescriptions.map((item) => ({ id: `resep-${item.id}`, title: 'Resep elektronik', detail: item.status })),
    ...bills.map((item) => ({ id: `bill-${item.id}`, title: 'Tagihan kasir', detail: item.status })),
  ].slice(-8);

  return (
    <section className="panel panel-pad">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">Audit</p>
          <h2 className="mt-1 text-lg font-bold">Jejak transaksi</h2>
        </div>
        <ClipboardList size={22} className="text-clinic-teal" aria-hidden="true" />
      </div>
      <div className="mt-4 space-y-2">
        {events.map((event) => (
          <div key={event.id} className="flex items-center justify-between gap-3 rounded-clinical border border-clinic-line p-3">
            <p className="text-sm font-semibold">{event.title}</p>
            <p className="text-xs font-medium text-clinic-muted">{event.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
