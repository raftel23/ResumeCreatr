import { useState, useCallback } from 'react';

/** @typedef {'template-classic'|'template-minimalist'|'template-executive'|'template-creative'|'template-technical'} TemplateId */

/**
 * @typedef {Object} ExperienceItem
 * @property {string} id
 * @property {string} title
 * @property {string} company
 * @property {string} start
 * @property {string} end
 * @property {string} desc
 */

/**
 * @typedef {Object} EducationItem
 * @property {string} id
 * @property {string} degree
 * @property {string} school
 * @property {string} start
 * @property {string} end
 */

/**
 * @typedef {Object} PersonalInfo
 * @property {string} name
 * @property {string} title
 * @property {string} email
 * @property {string} phone
 * @property {string} location
 * @property {string} links
 * @property {string} summary
 * @property {string} skills
 */

/** @returns {string} A unique short ID */
const uid = () => Math.random().toString(36).slice(2, 9);

const INITIAL_PERSONAL = {
  name: 'John Doe',
  title: 'Software Engineer',
  email: 'john@example.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  links: 'linkedin.com/in/johndoe',
  summary:
    'Dedicated and results-driven Software Engineer with over 5 years of experience in developing scalable web applications. Passionate about clean code, modern architecture, and solving complex problems.',
  skills: 'JavaScript, TypeScript, React, Node.js, HTML5, CSS3, Git, REST APIs',
};

const INITIAL_EXPERIENCE = [
  {
    id: uid(),
    title: 'Senior Software Engineer',
    company: 'Tech Solutions Inc.',
    start: '2020',
    end: 'Present',
    desc: '- Architected and built scalable frontend architectures\n- Mentored junior developers and enforced best practices\n- Improved application load times by 40%',
  },
  {
    id: uid(),
    title: 'Web Developer',
    company: 'Creative Agency',
    start: '2017',
    end: '2020',
    desc: '- Developed responsive web applications for various clients\n- Collaborated with UX designers to implement polished interfaces',
  },
];

const INITIAL_EDUCATION = [
  {
    id: uid(),
    degree: 'B.S. Computer Science',
    school: 'University of Technology',
    start: '2013',
    end: '2017',
  },
];

/**
 * Central state store for the resume builder.
 * Encapsulates all resume data and provides stable CRUD callbacks.
 */
export function useResumeStore() {
  const [personal, setPersonal] = useState(INITIAL_PERSONAL);
  const [experience, setExperience] = useState(INITIAL_EXPERIENCE);
  const [education, setEducation] = useState(INITIAL_EDUCATION);
  const [template, setTemplate] = useState('template-classic');

  /** Updates a single field in personal info by key. */
  const updatePersonal = useCallback((field, value) => {
    setPersonal((prev) => ({ ...prev, [field]: value }));
  }, []);

  /** Adds a blank (or pre-filled) experience item to the list. */
  const addExperience = useCallback((data = {}) => {
    setExperience((prev) => [
      ...prev,
      { id: uid(), title: '', company: '', start: '', end: '', desc: '', ...data },
    ]);
  }, []);

  /** Updates a field within a specific experience item by id. */
  const updateExperience = useCallback((id, field, value) => {
    setExperience((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }, []);

  /** Removes an experience item from the list by id. */
  const removeExperience = useCallback((id) => {
    setExperience((prev) => prev.filter((item) => item.id !== id));
  }, []);

  /** Adds a blank (or pre-filled) education item to the list. */
  const addEducation = useCallback((data = {}) => {
    setEducation((prev) => [
      ...prev,
      { id: uid(), degree: '', school: '', start: '', end: '', ...data },
    ]);
  }, []);

  /** Updates a field within a specific education item by id. */
  const updateEducation = useCallback((id, field, value) => {
    setEducation((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }, []);

  /** Removes an education item from the list by id. */
  const removeEducation = useCallback((id) => {
    setEducation((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    personal,
    updatePersonal,
    experience,
    addExperience,
    updateExperience,
    removeExperience,
    education,
    addEducation,
    updateEducation,
    removeEducation,
    template,
    setTemplate,
  };
}
