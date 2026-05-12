export const profile = {
  name: 'Nicholas Jason',
  role: 'Computer Science Student | Software Engineering Enthusiast',
  location: 'Indonesia / Odense, Denmark',
  email: 'nicholasjason54@gmail.com',
  intro:
    'Computer Science student building practical web, backend, machine learning, and systems projects.',
  about:
    'I enjoy turning technical ideas into usable software, from Laravel dashboards and research workflows to NLP experiments, computer vision prototypes, and lower-level scheduling simulations. I am looking for software engineering, backend, web development, and general computer science internship opportunities.',
  socials: [
    { label: 'GitHub', url: 'https://github.com/Nobunaga20' },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/nicholas-jason-769097309',
    },
    { label: 'Resume', url: '/resume.pdf' },
  ],
}

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const skills = [
  { name: 'Python', level: 'Programming' },
  { name: 'C / C++', level: 'Programming' },
  { name: 'Laravel', level: 'Web' },
  { name: 'React', level: 'Web' },
  { name: 'MySQL', level: 'Backend' },
  { name: 'Authentication & CRUD', level: 'Backend' },
  { name: 'NLP / DistilBERT', level: 'AI' },
  { name: 'TensorFlow / Keras', level: 'AI' },
  { name: 'Git & GitHub', level: 'Tools' },
  { name: 'Figma / Streamlit', level: 'Tools' },
  { name: 'Indonesian', level: 'Native' },
  { name: 'English', level: 'IELTS 7.5' },
]

export const categories = ['All', 'Web', 'AI', 'Systems']

export const projects = [
  {
    title: 'AndRPaid',
    category: 'Web',
    description:
      'Research management platform for organizing academic projects, collaboration, literature work, and publication workflows.',
    details:
      'Built a centralized Laravel application with separate lecturer and university workflows, verification, dashboards, researcher discovery, collaboration tools, and structured research spaces with formula rendering.',
    stack: ['Laravel 11', 'MySQL', 'Blade', 'KaTeX'],
    link: 'https://github.com/Nobunaga20/andrpaid',
  },
  {
    title: 'Toxic Comment Classifier',
    category: 'AI',
    description:
      'Multi-label NLP classifier comparing a traditional baseline with a transformer model for toxicity detection.',
    details:
      'Implemented TF-IDF with Logistic Regression and fine-tuned DistilBERT, then evaluated the approaches with macro ROC-AUC and macro F1 on the Jigsaw toxic comment dataset.',
    stack: ['Python', 'NLP', 'TF-IDF', 'DistilBERT'],
    link: 'https://github.com/Nobunaga20/TF-IDF-Regression-VS-DistilBERT-on-Toxic-Comment-Classification',
  },
  {
    title: 'Zero-DCE Low-Light Enhancement',
    category: 'AI',
    description:
      'Computer vision project that improves low-light images using a zero-reference deep learning approach.',
    details:
      'Implemented a lightweight CNN, trained with the LOL dataset, evaluated image quality with common metrics, and wrapped the model in a Streamlit app for interactive testing.',
    stack: ['Python', 'TensorFlow', 'Keras', 'Streamlit'],
    link: 'https://github.com/Nobunaga20/Zero-DCE-Low-Light-Enhancement',
  },
  {
    title: 'Round-Robin CPU Scheduler',
    category: 'Systems',
    description:
      'Unix-based scheduler simulation that models time-sharing execution across child processes.',
    details:
      'Created a C program that uses process control, POSIX signals, interval timers, configurable time slices, and rotating scheduler logic to simulate preemptive execution.',
    stack: ['C', 'Unix', 'POSIX Signals', 'Timers'],
    link: 'https://github.com/Nobunaga20/round-robin-scheduler',
  },
  {
    title: 'Inventory Management App',
    category: 'Web',
    description:
      'CRUD-based web application for managing item records and inventory tracking workflows.',
    details:
      'Developed a Laravel and MySQL application with create, read, update, and delete flows for inventory records, giving users a straightforward web interface for item management.',
    stack: ['Laravel', 'MySQL', 'Blade'],
  },
]

export const experience = [
  {
    company: 'Rasmus Rask Baren',
    role: 'Bartender',
    period: 'Mar 2026 - Present',
    summary:
      'Developing customer-facing communication, prioritization, and composure in a fast-paced service environment while studying abroad.',
    highlights: [
      'Handled multiple service tasks under pressure while maintaining quality.',
      'Communicated clearly with customers and teammates during busy shifts.',
      'Built habits around reliability, speed, and attention to detail.',
    ],
  },
  {
    company: 'HIMTI',
    role: 'Student Organization Contributor',
    period: 'Apr 2024 - Sep 2025',
    summary:
      'Supported student organization events through publication, promotion, marketing, and team communication.',
    highlights: [
      'Collaborated with committee members to coordinate event visibility.',
      'Helped communicate event information across student channels.',
      'Strengthened teamwork, planning, and audience-focused communication.',
    ],
  },
]

export const education = [
  {
    school: 'University of Southern Denmark',
    program: 'Exchange Student, Computer Science',
    year: 'Feb 2026 - Jul 2026',
  },
  {
    school: 'Bina Nusantara University',
    program: 'Computer Science',
    year: '2023 - Present',
  },
]
