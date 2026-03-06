import ResumeDocument from './ResumeDocument';

/**
 * Right-hand preview panel — wraps the live resume document in a scroll container.
 *
 * @param {{ store: ReturnType<import('../hooks/useResumeStore').useResumeStore> }} props
 * @returns {JSX.Element}
 */
export default function ResumePreview({ store }) {
  const { personal, experience, education, template } = store;

  return (
    <section className="preview-panel">
      <div className="resume-wrapper">
        <ResumeDocument
          personal={personal}
          experience={experience}
          education={education}
          template={template}
        />
      </div>
    </section>
  );
}
