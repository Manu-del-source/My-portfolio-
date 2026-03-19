import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  Send, 
  ExternalLink, 
  Menu, 
  X,
  Moon,
  Sun,
  Download,
  Bot,
  Code,
  Globe,
  Cpu,
  Network
} from 'lucide-react';

// --- Data ---
const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const SKILLS = [
  { name: 'Python (Automation, Bots, APIs)', icon: <Code className="w-6 h-6" />, progress: 95 },
  { name: 'HTML, CSS, JavaScript', icon: <Globe className="w-6 h-6" />, progress: 85 },
  { name: 'Automation & Bots', icon: <Bot className="w-6 h-6" />, progress: 90 },
  { name: 'Web Design', icon: <LayoutIcon className="w-6 h-6" />, progress: 80 },
  { name: 'API Integration', icon: <Network className="w-6 h-6" />, progress: 88 },
];

function LayoutIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <line x1="9" x2="9" y1="21" y2="9" />
    </svg>
  )
}

const PROJECTS = [
  {
    title: 'Deriv Trading Bot',
    description: 'An automated trading bot for the Deriv platform. Integrates signal logic and automated trading execution using Python.',
    image: 'https://picsum.photos/seed/tradingbot/800/600',
    tags: ['Python', 'Trading', 'Deriv API', 'Automation'],
    link: 'https://github.com/Manu-del-source',
  },
  {
    title: 'Sniper Bot V5',
    description: 'A refined trading bot with improved signal accuracy and optimized execution. Organized project structure managed via GitHub.',
    image: 'https://picsum.photos/seed/market/800/600',
    tags: ['Python', 'Trading', 'Algorithms'],
    link: 'https://github.com/Manu-del-source',
  },
  {
    title: 'Portfolio Website',
    description: 'A personal website designed to showcase projects and skills, featuring clean UI, responsive design, and integrated contact options.',
    image: 'https://picsum.photos/seed/webdesign/800/600',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    link: 'https://github.com/Manu-del-source',
  },
  {
    title: 'WhatsApp Bot (In Progress)',
    description: 'An intelligent bot built using Python, Twilio, and Render to automate responses and handle user interactions seamlessly.',
    image: 'https://picsum.photos/seed/messaging/800/600',
    tags: ['Python', 'Twilio', 'Render', 'Chatbot'],
    link: 'https://github.com/Manu-del-source',
  },
];

// --- Components ---

const Navbar = ({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="font-display font-bold text-xl tracking-tighter text-zinc-900 dark:text-zinc-50">
            E. KIPTOO<span className="text-emerald-500">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors">
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center gap-4 ml-4 border-l border-zinc-200 dark:border-zinc-800 pl-4">
              <button 
                onClick={toggleTheme} 
                className="p-2 text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href="#contact" className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-md shadow-emerald-500/20">
                Hire Me
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-zinc-600 dark:text-zinc-400">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-2 text-zinc-600 dark:text-zinc-400" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 shadow-lg"
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)} className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 px-5 py-3 rounded-xl text-center font-semibold mt-2 transition-colors shadow-md shadow-emerald-500/20">
              Hire Me
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col justify-center min-h-[90vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-8 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 dark:bg-emerald-500"></span>
          </span>
          Available for Freelance Projects
        </div>
        
        <h2 className="text-xl md:text-2xl font-medium text-zinc-600 dark:text-zinc-400 mb-4">
          Hi, I'm <span className="text-zinc-900 dark:text-white font-bold">Emmanuel Kiptoo Yegon</span>
        </h2>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight text-zinc-900 dark:text-white">
          Python Developer <br />
          <span className="text-zinc-400 dark:text-zinc-500">& Web Designer</span>
        </h1>
        
        <p className="text-zinc-600 dark:text-zinc-400 text-xl md:text-2xl max-w-2xl mb-10 leading-relaxed font-medium">
          "I build smart bots, automation systems, and modern websites."
        </p>
        
        <div className="flex flex-wrap gap-4">
          <a href="#projects" className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 px-8 py-4 rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center gap-2">
            View Projects
          </a>
          <a href="#contact" className="bg-transparent hover:bg-emerald-50 dark:hover:bg-emerald-500/10 border-2 border-emerald-600 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400 px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2">
            Contact Me
          </a>
          <a href="/cv.txt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-4 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
            <Download className="w-5 h-5" /> Download CV
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-zinc-900 dark:text-white flex items-center gap-4">
            <Cpu className="w-8 h-8 text-emerald-500" /> About Me
          </h2>
          <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg md:text-xl">
            <p>
              I am a self-driven and passionate <strong className="text-zinc-900 dark:text-zinc-200 font-semibold">Python Developer and Web Designer</strong> with hands-on experience building automation bots, trading tools, and portfolio websites.
            </p>
            <p>
              Skilled in developing real-world projects using Python and deploying applications using modern tools. My expertise spans across <strong className="text-zinc-900 dark:text-zinc-200 font-semibold">automation, APIs, and web design</strong>, with a growing focus on scalable web solutions.
            </p>
            <p>
              Currently, I am expanding my experience as a <strong className="text-zinc-900 dark:text-zinc-200 font-semibold">Freelance Developer</strong>, offering Python automation and bot development services while continuously learning and adapting to new technologies.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-zinc-900 dark:text-white text-center">Technical Arsenal</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SKILLS.map((skill, index) => (
            <div key={index} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  {skill.icon}
                </div>
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">{skill.name}</h3>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2.5 mb-1 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.progress}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-emerald-500 h-2.5 rounded-full"
                ></motion.div>
              </div>
              <div className="text-right text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {skill.progress}%
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-white">Featured Projects</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl">A selection of my best work in automation, bots, and web development.</p>
            </div>
            <a href="https://github.com/Manu-del-source" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
              View more on GitHub <Github className="w-5 h-5" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 gap-3">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-zinc-900 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-zinc-800">
                        <Github className="w-4 h-4" /> Code
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="bg-emerald-500 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-emerald-600">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold mb-3 text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium rounded-full border border-zinc-200 dark:border-zinc-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    linkedin: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    linkedin: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', linkedin: '', message: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (formData.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(formData.linkedin)) {
      newErrors.linkedin = 'Please enter a valid LinkedIn profile URL';
      isValid = false;
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setFormData({ email: '', linkedin: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white">Ready to start a project?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
            I'm available for freelance work. Reach out to me via email, messaging apps, or find me on freelance platforms.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-sm"
        >
          <h3 className="font-display text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Send me a message</h3>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {isSubmitted && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-medium border border-emerald-200 dark:border-emerald-500/20">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com" 
                className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-emerald-500'} focus:outline-none focus:ring-2 dark:text-white transition-shadow`} 
              />
              {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">LinkedIn Profile (Optional)</label>
              <input 
                type="url" 
                id="linkedin" 
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile" 
                className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border ${errors.linkedin ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-emerald-500'} focus:outline-none focus:ring-2 dark:text-white transition-shadow`} 
              />
              {errors.linkedin && <p className="mt-1.5 text-sm text-red-500">{errors.linkedin}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Message</label>
              <textarea 
                id="message" 
                rows={4} 
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..." 
                className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-emerald-500'} focus:outline-none focus:ring-2 dark:text-white transition-shadow resize-none`}
              ></textarea>
              {errors.message && <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>}
            </div>
            <motion.button 
              type="submit" 
              animate={isSubmitted ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.3 }}
              className={`w-full ${isSubmitted ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400'} text-white dark:text-zinc-950 px-8 py-4 rounded-xl font-semibold transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2`}
            >
              {isSubmitted ? "Message Sent!" : "Send Message"} <Send className="w-4 h-4" />
            </motion.button>
          </form>
        </motion.div>

        {/* Direct Contact Links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start"
        >
          <a 
            href="https://wa.me/254726090372" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 p-6 rounded-3xl transition-all border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-md group"
          >
            <div className="w-12 h-12 bg-emerald-50 dark:bg-zinc-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/10 rounded-2xl flex items-center justify-center transition-colors">
              <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-zinc-400 group-hover:text-emerald-500 transition-colors" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-zinc-900 dark:text-white">WhatsApp</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">+254 726 090 372</p>
            </div>
          </a>

          <a 
            href="https://t.me/Bohsell" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 p-6 rounded-3xl transition-all border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-md group"
          >
            <div className="w-12 h-12 bg-blue-50 dark:bg-zinc-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/10 rounded-2xl flex items-center justify-center transition-colors">
              <Send className="w-6 h-6 text-blue-600 dark:text-zinc-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-zinc-900 dark:text-white">Telegram</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">@Bohsell</p>
            </div>
          </a>

          <a 
            href="mailto:kiptooe213@gmail.com" 
            className="flex flex-col items-center gap-3 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 p-6 rounded-3xl transition-all border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 dark:hover:border-rose-500/50 shadow-sm hover:shadow-md group"
          >
            <div className="w-12 h-12 bg-rose-50 dark:bg-zinc-800 group-hover:bg-rose-100 dark:group-hover:bg-rose-500/10 rounded-2xl flex items-center justify-center transition-colors">
              <Mail className="w-6 h-6 text-rose-600 dark:text-zinc-400 group-hover:text-rose-500 transition-colors" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-zinc-900 dark:text-white">Email</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">kiptooe213@gmail.com</p>
            </div>
          </a>

          <a 
            href="https://www.linkedin.com/in/emmanuel-kiptoo-aa5b383a8" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 p-6 rounded-3xl transition-all border border-zinc-200 dark:border-zinc-800 hover:border-blue-600/50 dark:hover:border-blue-600/50 shadow-sm hover:shadow-md group"
          >
            <div className="w-12 h-12 bg-blue-50 dark:bg-zinc-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-600/10 rounded-2xl flex items-center justify-center transition-colors">
              <Linkedin className="w-6 h-6 text-blue-700 dark:text-zinc-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-zinc-900 dark:text-white">LinkedIn</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">Connect</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-10 border-t border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 text-center px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left">
          <a href="#home" className="font-display font-bold text-xl tracking-tighter text-zinc-900 dark:text-zinc-50 block mb-2">
            E. KIPTOO<span className="text-emerald-500">.</span>
          </a>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            © {new Date().getFullYear()} Emmanuel Kiptoo Yegon. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Manu-del-source" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-500/20 dark:hover:text-emerald-400 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/emmanuel-kiptoo-aa5b383a8" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-500/20 dark:hover:text-blue-400 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

