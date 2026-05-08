import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Boxes,
  CircleDollarSign,
  ClipboardList,
  GitBranch,
  HeartPulse,
  MonitorUp,
  Pill,
  RadioTower,
  UserPlus,
} from 'lucide-react';

const modules = [
  { id: 'erd', label: 'ERD MVP', icon: GitBranch },
  { id: 'pendaftaran', label: 'Pendaftaran', icon: UserPlus },
  { id: 'igd', label: 'IGD (Fase 2)', icon: AlertTriangle },
  { id: 'antrian', label: 'Antrian', icon: MonitorUp },
  { id: 'poliklinik', label: 'Poliklinik', icon: HeartPulse },
  { id: 'farmasi', label: 'Farmasi', icon: Pill },
  { id: 'kasir', label: 'Kasir', icon: CircleDollarSign },
  { id: 'stok', label: 'Stok', icon: Boxes },
  { id: 'audit', label: 'Audit', icon: ClipboardList },
];

export { modules };

export default function WorkbenchLayout({ activeModule, stats, onModuleChange, children }) {
  return (
    <div className="min-h-screen text-clinic-ink">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 px-3 py-3 sm:px-4 lg:flex-row lg:p-5">
        <aside className="panel lg:sticky lg:top-5 lg:h-[calc(100vh-40px)] lg:w-64">
          <div className="border-b border-clinic-line p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-clinical bg-clinic-teal text-white">
                <Activity size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold">Clinical Ops</p>
                <p className="text-xs text-clinic-muted">Workbench MVP</p>
              </div>
            </div>
          </div>
          <nav className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4 lg:grid-cols-1">
            {modules.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => onModuleChange(id)}
                className={`flex min-h-10 items-center gap-2 rounded-clinical px-3 text-sm font-semibold transition hover:bg-slate-100 ${
                  activeModule === id ? 'bg-clinic-tealSoft text-clinic-teal' : 'text-slate-600'
                }`}
              >
                <Icon size={17} aria-hidden="true" />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 space-y-4">
          <header className="panel panel-pad">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="label">Operasional Harian</p>
                <h1 className="mt-1 text-2xl font-bold tracking-normal text-clinic-ink sm:text-3xl">
                  Workbench Layanan Kesehatan
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-clinical border border-clinic-line bg-clinic-wash px-3 py-2">
                    <p className="text-xl font-bold">{item.value}</p>
                    <p className="text-xs font-medium text-clinic-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="status-pill border-emerald-200 bg-emerald-50 text-emerald-700">
                <BadgeCheck size={14} aria-hidden="true" /> Role demo aktif
              </span>
              <span className="status-pill border-teal-200 bg-teal-50 text-teal-700">
                <RadioTower size={14} aria-hidden="true" /> Socket.io simulasi
              </span>
              <span className="status-pill border-slate-200 bg-white text-slate-600">UUID lokal</span>
              <span className="status-pill border-slate-200 bg-white text-slate-600">JSONB visual</span>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
