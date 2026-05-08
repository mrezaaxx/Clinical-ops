import { ArrowRight } from 'lucide-react';

export default function ModulePage({ actions, children, description, eyebrow, title }) {
  return (
    <section className="space-y-4">
      <div className="panel panel-pad">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="label">{eyebrow}</p>
            <h2 className="mt-1 text-2xl font-bold tracking-normal text-clinic-ink">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-clinic-muted">{description}</p>
          </div>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export function NextModuleButton({ children, onClick }) {
  return (
    <button className="btn-secondary" type="button" onClick={onClick}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </button>
  );
}
