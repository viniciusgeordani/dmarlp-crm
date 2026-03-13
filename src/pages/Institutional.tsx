import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Facebook, LayoutDashboard, ChevronRight } from 'lucide-react';

export default function Institutional() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito de sombra e background no menu ao rolar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rolar para o topo ao carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans bg-white text-stone-900 selection:bg-[#004243] selection:text-white">

      {/* HEADER LUXO (Flutuante e Transparente) */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-stone-200 py-4' 
            : 'bg-transparent border-white/20 py-6'
        }`}
      >
        <div className="container mx-auto px-6 max-w-[1400px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img 
                src="https://dmarplanejados.com.br/wp-content/uploads/2025/02/LOGOMARCA_DMAR_19.02.png" 
                alt="D'Mar Planejados" 
                className={`transition-all duration-500 ${isScrolled ? 'h-8 invert' : 'h-10'}`} 
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: 'Unidades', id: 'lojas' },
              { label: 'Nossa Essência', id: 'sobre' },
              { label: 'Ambientes', id: 'ambientes' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm tracking-[0.15em] uppercase font-light transition-colors hover:text-[#c6a87c] ${
                  isScrolled ? 'text-stone-800' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link 
              to="/lp" 
              className={`hidden md:flex items-center gap-2 text-sm font-light uppercase tracking-widest px-6 py-2.5 border transition-all duration-300 ${
                isScrolled 
                  ? 'border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white' 
                  : 'border-white text-white hover:bg-white hover:text-stone-900'
              }`}
            >
              Orçamento
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION 100vh */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Ambiente de Luxo" 
            className="w-full h-full object-cover object-center scale-105 animate-[kenburns_20s_ease-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-stone-900/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <p className="text-white/80 uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-light">
            Arte em Marcenaria
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif leading-tight mb-8 drop-shadow-lg">
            Exclusividade em <br/><span className="italic font-light text-[#c6a87c]">cada detalhe.</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Projetos assinados que transformam casas em verdadeiras obras de arte, com qualidade premium e design atemporal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/lp" 
              className="bg-[#c6a87c] text-white px-10 py-4 text-sm font-light uppercase tracking-[0.2em] hover:bg-white hover:text-stone-900 transition-all duration-500 w-full sm:w-auto text-center"
            >
              Inicie seu Projeto
            </Link>
            <button 
              onClick={() => scrollToSection('ambientes')}
              className="px-10 py-4 text-sm font-light uppercase tracking-[0.2em] text-white border border-white hover:bg-white/10 transition-all duration-500 w-full sm:w-auto"
            >
              Ver Inspirações
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="text-white/50 rotate-90" size={32} strokeWidth={1} />
        </div>
      </section>

      {/* MANIFESTO / ESSÊNCIA (Sobre a marca) */}
      <section id="sobre" className="py-32 bg-stone-50">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[3/4] w-full max-w-md mx-auto lg:ml-0 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Detalhe Marcenaria" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-4 lg:-right-20 w-2/3 aspect-square bg-white p-4 shadow-xl hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Processo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 lg:pl-10">
              <span className="text-[#c6a87c] font-light tracking-[0.2em] text-xs uppercase mb-6 block">Nossa Essência</span>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight mb-10">
                A perfeição <br/>mora nos <span className="italic text-[#004243]">detalhes</span>.
              </h2>
              
              <div className="space-y-6 text-stone-500 font-light leading-relaxed text-lg mb-12">
                <p>Nascemos do desejo de ir além do comum. A D'Mar Planejados não fabrica apenas móveis, nós esculpimos experiências para morar bem.</p>
                <p>Nossas duas unidades reúnem o que há de mais moderno em tecnologia de produção europeia com o cuidado artesanal do marceneiro tradicional. O resultado são ambientes que impressionam à primeira vista e duram uma vida inteira.</p>
              </div>

              <div className="grid grid-cols-2 gap-12 border-t border-stone-200 pt-10">
                 <div>
                   <h4 className="text-5xl font-serif text-[#004243] mb-3">10<span className="text-xl">anos</span></h4>
                   <p className="text-xs text-stone-500 uppercase tracking-widest font-light">Garantia Total</p>
                 </div>
                 <div>
                   <h4 className="text-5xl font-serif text-[#004243] mb-3">+2k</h4>
                   <p className="text-xs text-stone-500 uppercase tracking-widest font-light">Projetos Executados</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMBIENTES (Galeria Estilo Masonry / Luxo) */}
      <section id="ambientes" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-[1400px]">
          
          <div className="text-center mb-24 max-w-3xl mx-auto">
             <span className="text-[#c6a87c] font-light tracking-[0.2em] text-xs uppercase mb-4 block">Coleções</span>
             <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Explore nossos Ambientes</h2>
             <p className="text-stone-500 font-light text-lg">Inspire-se com soluções de design criadas para transcender tendências e abraçar o seu estilo de vida único.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bloco Grande Vertical */}
            <div className="group relative aspect-[3/4] md:row-span-2 overflow-hidden bg-stone-100">
               <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Closets" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
               <div className="absolute inset-0 p-10 flex flex-col justify-end">
                 <h3 className="text-white text-3xl font-serif mb-2">Closets & Dormitórios</h3>
                 <p className="text-white/80 font-light tracking-wide text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">Ver Detalhes <ArrowRight size={14}/></p>
               </div>
            </div>

            {/* Bloco Horizontal Cima */}
            <div className="group relative aspect-video md:aspect-auto md:h-[400px] overflow-hidden bg-stone-100">
               <img src="https://images.unsplash.com/photo-1556910103-1c02745a872f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Cozinhas" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
               <div className="absolute inset-0 p-10 flex flex-col justify-end">
                 <h3 className="text-white text-3xl font-serif mb-2">Cozinhas Gourmet</h3>
                 <p className="text-white/80 font-light tracking-wide text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">Ver Detalhes <ArrowRight size={14}/></p>
               </div>
            </div>

            {/* Bloco Horizontal Baixo */}
            <div className="group relative aspect-video md:aspect-auto md:h-[400px] overflow-hidden bg-stone-100">
               <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Salas" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
               <div className="absolute inset-0 p-10 flex flex-col justify-end">
                 <h3 className="text-white text-3xl font-serif mb-2">Salas & Home Theater</h3>
                 <p className="text-white/80 font-light tracking-wide text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">Ver Detalhes <ArrowRight size={14}/></p>
               </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/lp" className="inline-block border border-stone-300 text-stone-500 hover:border-stone-900 hover:text-stone-900 px-10 py-4 text-sm font-light uppercase tracking-[0.2em] transition-all duration-300">
              Ver Todos os Projetos
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER LUXO */}
      <footer className="bg-stone-950 text-white pt-32 pb-12">
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
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#c6a87c] mb-8 font-light">Navegação</h4>
              <ul className="space-y-4">
                <li><button onClick={() => scrollToSection('sobre')} className="text-stone-400 hover:text-white transition-colors text-sm font-light">O Manifesto</button></li>
                <li><button onClick={() => scrollToSection('ambientes')} className="text-stone-400 hover:text-white transition-colors text-sm font-light">Coleções</button></li>
                <li><Link to="/lp" className="text-stone-400 hover:text-white transition-colors text-sm font-light">Exclusividade</Link></li>
              </ul>
            </div>

            <div id="lojas" className="md:col-span-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#c6a87c] mb-8 font-light">Nossos Studios</h4>
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
