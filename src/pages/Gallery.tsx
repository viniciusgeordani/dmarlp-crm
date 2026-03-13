import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, LayoutGrid, List } from 'lucide-react';

const categories = [
  "Todos",
  "Área Gourmet",
  "Clínica",
  "Corredor",
  "Cozinha",
  "Escritório",
  "Home Office",
  "Dormitório",
  "Banheiro"
];

// Mock de projetos para a galeria
const projects = [
  { id: 1, title: 'Cozinha', category: 'Cozinha', image: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Clínica', category: 'Clínica', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Sala de Jantar', category: 'Cozinha', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Escritório', category: 'Escritório', image: 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Sala de Estar', category: 'Livings', image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Quarto de Solteiro', category: 'Dormitório', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 7, title: 'Cozinha Moderna', category: 'Cozinha', image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 8, title: 'Home Office', category: 'Home Office', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 9, title: 'Cozinha Compacta', category: 'Cozinha', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 10, title: 'Quarto de Casal', category: 'Dormitório', image: 'https://images.unsplash.com/photo-1522771731478-44fb1014ccce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 11, title: 'Quarto Infantil', category: 'Dormitório', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 12, title: 'Home Theater', category: 'Home Office', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0); // Start at top
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === "Todos" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || project.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen font-sans bg-white text-stone-900 selection:bg-[#004243] selection:text-white pb-32">
      
      {/* HEADER LUXO (Reutilizado do Institucional) */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-stone-200 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-md' : 'bg-white py-5 shadow-sm'}`}>
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img 
                src="https://dmarplanejados.com.br/wp-content/uploads/2025/02/LOGOMARCA_DMAR_19.02.png" 
                alt="D'Mar Planejados" 
                className="h-8" 
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <nav className="flex items-center gap-6 lg:gap-8">
              <Link to="/" className="relative group text-[11px] lg:text-xs tracking-widest uppercase font-medium text-stone-800 hover:text-[#004041] transition-colors py-1">
                Início
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#004041] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO SECTION 50vh */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Galeria de Projetos" 
            className="w-full h-full object-cover mix-blend-multiply opacity-90"
          />
          <div className="absolute inset-0 bg-stone-900/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <span className="text-[#e9ad81] font-light tracking-[0.3em] uppercase text-xs md:text-sm mb-6 block drop-shadow-md">
            Inspirações
          </span>
          <h1 className="text-4xl md:text-6xl font-medium text-white mb-6 uppercase tracking-wider drop-shadow-lg">
            Nossa Galeria
          </h1>
          <p className="text-stone-200 text-lg md:text-xl font-light mx-auto max-w-2xl drop-shadow-md">
            Explore nossos projetos executados e encontre a inspiração perfeita para o seu novo ambiente.
          </p>
        </div>
      </section>

      {/* FILTER BAR SECTION */}
      <section className="sticky top-[73px] md:top-[74px] z-40 bg-white border-b border-stone-200 py-4 shadow-sm">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-64 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar projetos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#004041] focus:border-[#004041] transition-all bg-stone-50 hover:bg-white"
              />
            </div>

            {/* Category Pills (Scrollable horizontally) */}
            <div className="flex-1 w-full overflow-x-auto no-scrollbar pb-1 md:pb-0 hide-scroll-bar">
              <div className="flex items-center gap-2 justify-start md:justify-center min-w-max px-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                      activeCategory === category 
                        ? 'bg-[#4B3B34] text-white shadow-md' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
                <button className="px-5 py-2 rounded-full text-xs font-medium bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all duration-300 shadow-sm">
                  Mostrar mais
                </button>
              </div>
            </div>

            {/* View Toggles */}
            <div className="hidden md:flex items-center gap-1 bg-stone-50 border border-stone-200 p-1 rounded-lg flex-shrink-0">
              <button className="p-1.5 bg-white shadow-sm rounded-md text-stone-800">
                <LayoutGrid size={16} />
              </button>
              <button className="p-1.5 text-stone-400 hover:text-stone-800 transition-colors rounded-md">
                <List size={16} />
              </button>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .hide-scroll-bar::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll-bar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* GALLERY GRID */}
      <section className="pt-10">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="mb-6 text-sm text-stone-500 font-light pl-1">
            {filteredProjects.length} projetos encontrados
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-sm border border-stone-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                {/* Image */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Top Badge Overlay */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-white/90 backdrop-blur text-stone-800 text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-medium shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="py-20 text-center text-stone-500">
              <p>Nenhum projeto encontrado para esta categoria ou busca.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
