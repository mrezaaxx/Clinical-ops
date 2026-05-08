import { Boxes } from 'lucide-react';

export default function StockPanel({ medicines }) {
  return (
    <section className="panel panel-pad">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">Gudang Mini</p>
          <h2 className="mt-1 text-lg font-bold">Stok obat realtime</h2>
        </div>
        <Boxes size={22} className="text-clinic-teal" aria-hidden="true" />
      </div>
      <div className="mt-4 overflow-hidden rounded-clinical border border-clinic-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-clinic-wash text-xs uppercase text-clinic-muted">
            <tr>
              <th className="px-3 py-3 font-semibold">Kode</th>
              <th className="px-3 py-3 font-semibold">Obat</th>
              <th className="px-3 py-3 text-right font-semibold">Stok</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-clinic-line bg-white">
            {medicines.map((medicine) => (
              <tr key={medicine.kodeObat}>
                <td className="px-3 py-3 font-mono text-xs text-slate-500">{medicine.kodeObat}</td>
                <td className="px-3 py-3 font-semibold">{medicine.nama}</td>
                <td className="px-3 py-3 text-right">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                    {medicine.stok} {medicine.satuan}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
