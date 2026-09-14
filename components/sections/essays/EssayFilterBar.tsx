'use client';

interface FilterOption {
  key: string;
  label: string;
}

interface EssayFilterBarProps {
  options: FilterOption[];
  active: string;
  onChange: (key: string) => void;
}

/**
 * EssayFilterBar — category pills on the /essays index. Renders even when
 * only one or two categories currently have matching essays (Step 17 spec:
 * it's page chrome, not conditional on how many essays exist yet).
 */
export function EssayFilterBar({ options, active, onChange }: EssayFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3" role="group">
      {options.map((option) => {
        const isActive = option.key === active;
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.key)}
            className={[
              'type-button rounded-pill px-4 py-2 border transition-colors duration-300',
              isActive
                ? 'bg-accent border-accent text-cream'
                : 'bg-transparent border-rule text-ink hover:border-ink',
            ].join(' ')}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
