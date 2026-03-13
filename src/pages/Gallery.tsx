import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, LayoutDashboard } from 'lucide-react';

const categories = [
  "Todos",
  "Dormitórios",
  "Cozinhas Gourmet",
  "Livings & Home",
  "Corporativos",
  "Áreas Externas",
  "Banheiros & Spas"
];

// Mock de projetos para a galeria
const projects = [
  { id: 1, title: 'Dormitório Master', category: 'Dormitórios', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Cozinha com Ilha', category: 'Cozinhas Gourmet', image: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Living Integrado', category: 'Livings & Home', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Escritório Executivo', category: 'Corporativos', image: 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Varanda Decorada', category: 'Áreas Externas', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Spa Privativo', category: 'Banheiros & Spas', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 7, title: 'Dormitório Infantil', category: 'Dormitórios', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 8, title: 'Cozinha Linear', category: 'Cozinhas Gourmet', image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 9, title: 'Home Theater', category: 'Livings & Home', image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 10, title: 'Recepção', category: 'Corporativos', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 11, title: 'Área de Lazer', category: 'Áreas Externas', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 12, title: 'Banheiro Clássico', category: 'Banheiros & Spas', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const filteredProjects = projects.filter(project => {
    return activeCategory === "Todos" || project.category === activeCategory;
  });

  return (
    <div className="min-h-screen font-sans bg-white text-stone-900 selection:bg-[#004243] selection:text-white">
      
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
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
            
            {/* Category Pills (Scrollable horizontally) */}
            <div className="w-full overflow-x-auto no-scrollbar pb-1 md:pb-0 hide-scroll-bar flex justify-center">
              <div className="flex items-center gap-2 justify-start md:justify-center min-w-max px-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 flex-shrink-0 ${
                      activeCategory === category 
                        ? 'bg-[#4B3B34] text-white shadow-md' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
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
              <div key={project.id} className="group relative rounded-2xl overflow-hidden aspect-square bg-stone-100 shadow-sm border border-stone-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
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

      {/* FOOTER LUXO */}
      <footer className="bg-stone-950 text-white pt-32 pb-12 mt-20">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
            
            <div className="md:col-span-4">
              <img src="https://dmarplanejados.com.br/wp-content/uploads/2025/02/LOGOMARCA_DMAR_19.02.png" alt="D'Mar Planejados" className="h-8 mb-8" />
              <p className="text-stone-400 font-light leading-relaxed mb-8 text-sm max-w-sm">
                A materialização da mais alta sofisticação em mobiliário sob medida. Mais do que móveis, a identidade do seu morar.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://instagram.com/dmarplanejados" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-stone-800 rounded-full flex items-center justify-center hover:border-stone-500 hover:text-white transition-all text-stone-500">
                  <Instagram strokeWidth={1.5} size={16} />
                </a>
                <a href="https://facebook.com/dmarplanejados" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-stone-800 rounded-full flex items-center justify-center hover:border-stone-500 hover:text-white transition-all text-stone-500">
                  <Facebook strokeWidth={1.5} size={16} />
                </a>
              </div>
            </div>

            <div className="md:col-span-2 md:col-start-7">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#e9ad81] mb-8 font-light">Navegação</h4>
              <ul className="space-y-4">
                <li><a href="/#sobre" className="text-stone-400 hover:text-white transition-colors text-sm font-light">O Manifesto</a></li>
                <li><a href="/#ambientes" className="text-stone-400 hover:text-white transition-colors text-sm font-light">Coleções</a></li>
                <li><Link to="/lp" className="text-stone-400 hover:text-white transition-colors text-sm font-light">Exclusividade</Link></li>
              </ul>
            </div>

            <div id="lojas" className="md:col-span-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#e9ad81] mb-8 font-light">Nossos Studios</h4>
              <ul className="space-y-8">
                <li>
                  <p className="text-white text-sm tracking-widest uppercase mb-2">São Paulo</p>
                  <p className="text-stone-400 font-light text-sm">Av. Ibirapuera, 1000<br/>CEP 04028-000, Moema - SP</p>
                </li>
                <li>
                  <p className="text-white text-sm tracking-widest uppercase mb-2">Rio de Janeiro</p>
                  <p className="text-stone-400 font-light text-sm">Av. Lúcio Costa, 500<br/>CEP 22620-170, Barra - RJ</p>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 font-light">
            <p>&copy; {new Date().getFullYear()} D'Mar Planejados Premium. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
               <Link to="/admin-painel-crm-dmar" className="hover:text-white transition-colors flex items-center gap-2">
                 <LayoutDashboard size={12}/> Portal Arq/Lojista
               </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
