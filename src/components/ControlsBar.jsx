/**
 * Controls bar component — template selector and Print/PDF button.
 *
 * @param {{ template: string, setTemplate: (t: string) => void }} props
 * @returns {JSX.Element}
 */
export default function ControlsBar({ template, setTemplate }) {
  /** @type {Array<{value: string, label: string}>} */
  const TEMPLATES = [
    { value: 'template-classic',    label: 'Classic Professional' },
    { value: 'template-minimalist', label: 'Modern Minimalist' },
    { value: 'template-executive',  label: 'Executive' },
    { value: 'template-creative',   label: 'Creative Clean' },
    { value: 'template-technical',  label: 'Technical' },
  ];

  return (
    <div className="controls-bar">
      <div className="template-selector">
        <label htmlFor="templateSelect">Template:</label>
        <select
          id="templateSelect"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        >
          {TEMPLATES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <button
        className="btn-primary"
        onClick={() => window.print()}
        title="Save as PDF or Print"
      >
        <PrintIcon />
        Print / PDF
      </button>
    </div>
  );
}

/** Inline SVG print icon. @returns {JSX.Element} */
function PrintIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}
