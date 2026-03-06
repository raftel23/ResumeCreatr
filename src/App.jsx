import { useResumeStore } from './hooks/useResumeStore';
import EditorPanel from './components/EditorPanel';
import ResumePreview from './components/ResumePreview';

/**
 * Root application component.
 * Owns the global resume state and passes slices down to each panel.
 * @returns {JSX.Element}
 */
export default function App() {
  const store = useResumeStore();

  return (
    <div className="app-container">
      <EditorPanel store={store} />
      <ResumePreview store={store} />
    </div>
  );
}
