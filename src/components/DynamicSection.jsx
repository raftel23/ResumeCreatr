import { useState } from 'react';

/**
 * Reusable collapsible section for arrays of user-defined items (experience, education).
 * Renders each item as a card with configurable fields, driven by a generic field config array.
 *
 * @param {{
 *   title: string,
 *   icon: string,
 *   items: Array<{id: string, [key: string]: string}>,
 *   onAdd: () => void,
 *   onRemove: (id: string) => void,
 *   onUpdate: (id: string, field: string, value: string) => void,
 *   fields: Array<{key: string, label: string, placeholder: string, fullWidth?: boolean, textarea?: boolean, rows?: number}>,
 *   addLabel: string
 * }} props
 * @returns {JSX.Element}
 */
export default function DynamicSection({
  title, icon, items, onAdd, onRemove, onUpdate, fields, addLabel,
}) {
  const [open, setOpen] = useState(true);

  return (
    <section className="form-card">
      <button
        type="button"
        className={`form-card-header ${open ? 'open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="form-card-icon">{icon}</span>
        <span className="form-card-title">{title}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="form-card-body">
          <div className="dynamic-list">
            {items.map((item, idx) => (
              <DynamicItem
                key={item.id}
                index={idx + 1}
                item={item}
                fields={fields}
                onUpdate={onUpdate}
                onRemove={onRemove}
              />
            ))}
          </div>
          <button type="button" className="btn-secondary" onClick={onAdd}>
            {addLabel}
          </button>
        </div>
      )}
    </section>
  );
}

/**
 * Single item card within a DynamicSection, rendered from field config.
 *
 * @param {{
 *   index: number,
 *   item: {id: string, [key: string]: string},
 *   fields: Array<{key: string, label: string, placeholder: string, fullWidth?: boolean, textarea?: boolean, rows?: number}>,
 *   onUpdate: (id: string, field: string, value: string) => void,
 *   onRemove: (id: string) => void
 * }} props
 * @returns {JSX.Element}
 */
function DynamicItem({ index, item, fields, onUpdate, onRemove }) {
  return (
    <div className="form-item">
      <div className="item-header">
        <span className="item-header-label">Entry #{index}</span>
        <button
          type="button"
          className="btn-icon"
          title="Remove"
          onClick={() => onRemove(item.id)}
          aria-label="Remove entry"
        >
          ✕
        </button>
      </div>
      <div className="item-body">
        <div className="input-grid">
          {fields.map(({ key, label, placeholder, fullWidth, textarea, rows }) => (
            <div key={key} className={`input-group${fullWidth ? ' full-width' : ''}`}>
              <label htmlFor={`${item.id}-${key}`}>{label}</label>
              {textarea ? (
                <textarea
                  id={`${item.id}-${key}`}
                  rows={rows ?? 3}
                  value={item[key] ?? ''}
                  placeholder={placeholder}
                  onChange={(e) => onUpdate(item.id, key, e.target.value)}
                />
              ) : (
                <input
                  id={`${item.id}-${key}`}
                  type="text"
                  value={item[key] ?? ''}
                  placeholder={placeholder}
                  onChange={(e) => onUpdate(item.id, key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Animated chevron icon.
 * @param {{ open: boolean }} props
 * @returns {JSX.Element}
 */
function ChevronIcon({ open }) {
  return (
    <svg
      className={`form-card-chevron ${open ? 'open' : ''}`}
      width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
