import { Database, KeyRound } from 'lucide-react';

const entities = [
  { name: 'pasien', fields: ['id uuid pk', 'no_rm unique', 'nik indexed', 'riwayat_alergi jsonb'] },
  { name: 'kunjungan', fields: ['id uuid pk', 'pasien_id fk', 'nomor_antrian', 'status indexed'] },
  { name: 'anamnesa', fields: ['id uuid pk', 'kunjungan_id fk', 'kode_icd10 indexed', 'pemeriksaan_fisik jsonb'] },
  { name: 'resep', fields: ['id uuid pk', 'kunjungan_id fk', 'status indexed', 'keterangan'] },
  { name: 'tagihan', fields: ['id uuid pk', 'kunjungan_id fk', 'total_biaya decimal', 'status indexed'] },
];

export default function ErDiagramPanel() {
  return (
    <section id="erd-mvp" className="panel panel-pad">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="label">Rancangan Data</p>
          <h2 className="mt-1 text-lg font-bold">Entity-Relationship MVP</h2>
        </div>
        <div className="rounded-clinical border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-800">
          Soft delete, eager loading, transaction
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-5">
        {entities.map((entity, index) => (
          <article key={entity.name} className="relative rounded-clinical border border-clinic-line bg-clinic-wash p-3">
            {index > 0 ? (
              <div className="absolute -left-3 top-1/2 hidden h-px w-3 bg-clinic-line lg:block" aria-hidden="true" />
            ) : null}
            <div className="flex items-center gap-2 border-b border-clinic-line pb-2">
              <Database size={16} className="text-clinic-teal" aria-hidden="true" />
              <h3 className="text-sm font-bold">{entity.name}</h3>
            </div>
            <ul className="mt-2 space-y-1 text-xs text-slate-600">
              {entity.fields.map((field) => (
                <li key={field} className="flex items-center gap-2">
                  <KeyRound size={12} className="shrink-0 text-slate-400" aria-hidden="true" />
                  <span className="truncate">{field}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
