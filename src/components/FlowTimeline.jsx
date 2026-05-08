import { CheckCircle2, Circle, RadioTower } from 'lucide-react';

const steps = ['Daftar', 'Antri', 'Periksa', 'Farmasi', 'Kasir', 'Selesai'];

export default function FlowTimeline({ currentIndex }) {
  return (
    <section className="panel panel-pad">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="label">Alur Demo</p>
          <h2 className="mt-1 text-lg font-bold">Status kunjungan</h2>
        </div>
        <div className="flex items-center gap-2 rounded-clinical border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-800">
          <RadioTower size={14} aria-hidden="true" />
          Event lokal tersinkron
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
        {steps.map((step, index) => {
          const done = index <= currentIndex;
          const Icon = done ? CheckCircle2 : Circle;
          return (
            <div
              key={step}
              className={`flex min-h-14 items-center gap-2 rounded-clinical border px-3 ${
                done ? 'border-teal-200 bg-teal-50 text-teal-800' : 'border-clinic-line bg-white text-slate-500'
              }`}
            >
              <Icon size={17} aria-hidden="true" />
              <span className="text-sm font-bold">{step}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
