import { useState } from 'react';

/**
 * Collapsible skills form card.
 *
 * @param {{
 *   skills: string,
 *   updatePersonal: (field: string, value: string) => void
 * }} props
 * @returns {JSX.Element}
 */
export default function SkillsForm({ skills, updatePersonal }) {
  const [open, setOpen] = useState(true);

  return (
    <section className="form-card">
      <button
        type="button"
        className={`form-card-header ${open ? 'open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="form-card-icon">⚡</span>
        <span className="form-card-title">Skills</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="form-card-body">
          <div className="input-group">
            <label htmlFor="skills-input">Comma-separated skills</label>
            <input
              id="skills-input"
              type="text"
              value={skills}
              placeholder="JavaScript, React, Node.js, CSS…"
              onChange={(e) => updatePersonal('skills', e.target.value)}
            />
          </div>
        </div>
      )}
    </section>
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
