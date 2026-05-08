import { CircleDollarSign, Printer } from 'lucide-react';
import { formatRupiah, statusTone } from '../data/mockData';

export default function CashierPanel({ bills, visitsById, patientsById, onPayBill }) {
  const activeBill = bills.find((bill) => bill.status !== 'LUNAS') ?? bills[0];
  const visit = activeBill ? visitsById.get(activeBill.kunjunganId) : null;
  const patient = visit ? patientsById.get(visit.pasienId) : null;

  return (
    <section id="kasir" className="panel panel-pad">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">Kasir</p>
          <h2 className="mt-1 text-lg font-bold">Pembayaran presisi</h2>
        </div>
        <CircleDollarSign size={22} className="text-clinic-teal" aria-hidden="true" />
      </div>

      {activeBill ? (
        <article className="mt-4 rounded-clinical border border-clinic-line p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{patient?.namaLengkap ?? 'Pasien'}</p>
              <p className="mt-1 text-xs text-clinic-muted">Tagihan decimal snapshot</p>
            </div>
            <span className={`status-pill ${statusTone[activeBill.status] ?? 'border-slate-200 bg-white text-slate-600'}`}>
              {activeBill.status}
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {activeBill.detail.map((item) => (
              <div key={item.namaItem} className="grid grid-cols-[1fr_auto] gap-3 rounded-clinical bg-slate-50 px-3 py-2 text-sm">
                <span className="min-w-0 truncate">{item.namaItem}</span>
                <span className="font-semibold">{formatRupiah(item.subtotal)}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-clinic-line pt-3">
            <span className="text-sm font-semibold text-slate-600">Total</span>
            <span className="text-xl font-black">{formatRupiah(activeBill.totalBiaya)}</span>
          </div>

          <button className="btn-primary mt-3 w-full" type="button" onClick={() => onPayBill(activeBill.id)} disabled={activeBill.status === 'LUNAS'}>
            <Printer size={16} aria-hidden="true" />
            Bayar + Cetak
          </button>
        </article>
      ) : (
        <p className="mt-4 rounded-clinical border border-clinic-line p-3 text-sm text-clinic-muted">Belum ada tagihan.</p>
      )}
    </section>
  );
}
