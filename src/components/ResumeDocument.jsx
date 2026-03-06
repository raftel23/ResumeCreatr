/**
 * The actual rendered resume document, styled by the active theme class.
 * Pure presentational component — all data comes from props, no local state.
 *
 * @param {{
 *   personal: import('../hooks/useResumeStore').PersonalInfo,
 *   experience: import('../hooks/useResumeStore').ExperienceItem[],
 *   education: import('../hooks/useResumeStore').EducationItem[],
 *   template: string
 * }} props
 * @returns {JSX.Element}
 */
export default function ResumeDocument({ personal, experience, education, template }) {
  const skills = personal.skills
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className={`resume-document ${template}`}>
      {/* ── HEADER ─────────────────────────────────────── */}
      <div className="resume-header">
        <h1 className="resume-name">{personal.name || 'Your Name'}</h1>
        <div className="resume-title">{personal.title}</div>
        <ContactLine personal={personal} />
      </div>

      {/* ── BODY ───────────────────────────────────────── */}
      <div className="resume-body">
        {/* Summary */}
        {personal.summary && (
          <div className="resume-section">
            <h2 className="section-title">Professional Summary</h2>
            <p className="resume-summary-text">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">Experience</h2>
            <div className="resume-dynamic-list">
              {experience.map((exp) => (
                <ExperienceEntry key={exp.id} data={exp} />
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">Education</h2>
            <div className="resume-dynamic-list">
              {education.map((edu) => (
                <EducationEntry key={edu.id} data={edu} />
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">Skills</h2>
            <ul className="resume-skills-list">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Renders the contact line with separators, hiding the links entry if empty.
 * @param {{ personal: import('../hooks/useResumeStore').PersonalInfo }} props
 * @returns {JSX.Element}
 */
function ContactLine({ personal }) {
  const parts = [
    personal.email,
    personal.phone,
    personal.location,
  ].filter(Boolean);

  return (
    <div className="resume-contact">
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {(i < parts.length - 1 || personal.links) && (
            <span className="contact-separator"> • </span>
          )}
        </span>
      ))}
      {personal.links && <span>{personal.links}</span>}
    </div>
  );
}

/**
 * Single experience entry in the resume preview.
 * @param {{ data: import('../hooks/useResumeStore').ExperienceItem }} props
 * @returns {JSX.Element}
 */
function ExperienceEntry({ data }) {
  const bullets = data.desc
    ? data.desc
        .split('\n')
        .map((line) => line.replace(/^-/, '').trim())
        .filter(Boolean)
    : [];

  return (
    <div className="resume-item">
      <div className="resume-item-header">
        <h3 className="resume-item-title">{data.title}</h3>
        <span className="resume-item-date">
          {data.start} {data.end ? `– ${data.end}` : ''}
        </span>
      </div>
      <div className="resume-item-subtitle">{data.company}</div>
      {bullets.length > 0 && (
        <ul className="resume-item-desc">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Single education entry in the resume preview.
 * @param {{ data: import('../hooks/useResumeStore').EducationItem }} props
 * @returns {JSX.Element}
 */
function EducationEntry({ data }) {
  return (
    <div className="resume-item">
      <div className="resume-item-header">
        <h3 className="resume-item-title">{data.degree}</h3>
        <span className="resume-item-date">
          {data.start} {data.end ? `– ${data.end}` : ''}
        </span>
      </div>
      <div className="resume-item-subtitle">{data.school}</div>
    </div>
  );
}
