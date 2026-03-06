import { useState } from 'react';

/**
 * Collapsible form card (accordion) wrapping all static personal-info inputs.
 *
 * @param {{
 *   personal: import('../hooks/useResumeStore').PersonalInfo,
 *   updatePersonal: (field: string, value: string) => void
 * }} props
 * @returns {JSX.Element}
 */
export default function PersonalInfoForm({ personal, updatePersonal }) {
  const [open, setOpen] = useState(true);

  return (
    <section className="form-card">
      <button
        type="button"
        className={`form-card-header ${open ? 'open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="form-card-icon">👤</span>
        <span className="form-card-title">Personal Information</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="form-card-body">
          <div className="input-grid">
            {FIELDS.map(({ key, label, type, placeholder, fullWidth }) => (
              <div key={key} className={`input-group${fullWidth ? ' full-width' : ''}`}>
                <label htmlFor={`pi-${key}`}>{label}</label>
                <input
                  id={`pi-${key}`}
                  type={type ?? 'text'}
                  value={personal[key]}
                  placeholder={placeholder}
                  onChange={(e) => updatePersonal(key, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Summary textarea */}
          <div className="input-group">
            <label htmlFor="pi-summary">Professional Summary</label>
            <textarea
              id="pi-summary"
              rows={4}
              value={personal.summary}
              placeholder="Write a short summary about your professional background..."
              onChange={(e) => updatePersonal('summary', e.target.value)}
            />
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Simple animated chevron indicator.
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

/** Static field definitions for the personal info grid. */
const FIELDS = [
  { key: 'name',     label: 'Full Name',         placeholder: 'John Doe' },
  { key: 'title',    label: 'Job Title',          placeholder: 'Software Engineer' },
  { key: 'email',    label: 'Email',              placeholder: 'john@example.com', type: 'email' },
  { key: 'phone',    label: 'Phone',              placeholder: '(555) 123-4567',   type: 'tel' },
  { key: 'location', label: 'Location / Address', placeholder: 'San Francisco, CA', fullWidth: true },
  { key: 'links',    label: 'Website / LinkedIn', placeholder: 'linkedin.com/in/johndoe', fullWidth: true },
];
