import PersonalInfoForm from './PersonalInfoForm';
import DynamicSection from './DynamicSection';
import SkillsForm from './SkillsForm';
import ControlsBar from './ControlsBar';

/**
 * Left-hand editor panel.
 * Renders the header, controls bar, all form sections, and a footer.
 *
 * @param {{ store: import('../hooks/useResumeStore').ReturnType<typeof import('../hooks/useResumeStore').useResumeStore> }} props
 * @returns {JSX.Element}
 */
export default function EditorPanel({ store }) {
  const {
    personal, updatePersonal,
    experience, addExperience, updateExperience, removeExperience,
    education, addEducation, updateEducation, removeEducation,
    template, setTemplate,
  } = store;

  return (
    <aside className="editor-panel noprint">
      {/* Branding header */}
      <header className="editor-header">
        <h1>Resume Creator</h1>
        <p>Build your professional resume in real-time.</p>
      </header>

      {/* Template selector + Print button */}
      <ControlsBar template={template} setTemplate={setTemplate} />

      {/* Form sections */}
      <div className="form-sections">
        <PersonalInfoForm personal={personal} updatePersonal={updatePersonal} />

        <DynamicSection
          title="Work Experience"
          icon="💼"
          items={experience}
          onAdd={() => addExperience()}
          onRemove={removeExperience}
          onUpdate={updateExperience}
          fields={EXP_FIELDS}
          addLabel="+ Add Experience"
        />

        <DynamicSection
          title="Education"
          icon="🎓"
          items={education}
          onAdd={() => addEducation()}
          onRemove={removeEducation}
          onUpdate={updateEducation}
          fields={EDU_FIELDS}
          addLabel="+ Add Education"
        />

        <SkillsForm skills={personal.skills} updatePersonal={updatePersonal} />
      </div>

      <footer className="editor-footer">
        <span>🔒 All data stays in your browser.</span>
      </footer>
    </aside>
  );
}

/** @type {Array<{key: string, label: string, placeholder: string, fullWidth?: boolean, textarea?: boolean, rows?: number}>} */
const EXP_FIELDS = [
  { key: 'title',   label: 'Job Title', placeholder: 'Senior Developer' },
  { key: 'company', label: 'Company',   placeholder: 'Tech Corp' },
  { key: 'start',   label: 'Start Date', placeholder: 'Jan 2020' },
  { key: 'end',     label: 'End Date',   placeholder: 'Present' },
  { key: 'desc',    label: 'Description (bullets separated by new lines)', placeholder: '- Led a team of 5...\n- Improved performance by 30%...', fullWidth: true, textarea: true, rows: 3 },
];

/** @type {Array<{key: string, label: string, placeholder: string}>} */
const EDU_FIELDS = [
  { key: 'degree', label: 'Degree / Program',   placeholder: 'B.S. Computer Science' },
  { key: 'school', label: 'School / University', placeholder: 'University of Technology' },
  { key: 'start',  label: 'Start Year',          placeholder: '2016' },
  { key: 'end',    label: 'End Year',             placeholder: '2020' },
];
