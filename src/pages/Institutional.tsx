import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Facebook, LayoutDashboard, ChevronRight, Palette, Gem, Ruler } from 'lucide-react';

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

      {/* HEADER LUXO (Estilo Referência) */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-stone-200 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-md' : 'bg-white py-5 shadow-sm'}`}>
        <div className="container mx-auto px-6 md:px-16 lg:px-24 max-w-7xl flex items-center justify-between">
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
              {[
                { label: 'Ambientes', id: 'ambientes' },
                { label: 'Sobre Nós', id: 'sobre' },
                { label: 'Unidades', id: 'lojas' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative group text-[11px] lg:text-xs tracking-widest uppercase font-medium text-stone-800 hover:text-[#004041] transition-colors py-1"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#004041] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            <Link 
              to="/lp" 
              className="flex items-center justify-center bg-[#004041] hover:bg-[#002f30] text-white text-[11px] lg:text-xs font-light uppercase tracking-widest px-8 py-3.5 transition-colors duration-300"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION (Abaixo do Header) */}
      <section className="relative min-h-[83vh] flex items-center justify-center overflow-hidden bg-stone-900 pt-20">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/fotoprincipal02.png" 
            alt="Ambiente de Luxo" 
            className="w-full h-full object-cover object-center scale-105 animate-[kenburns_20s_ease-out_infinite_alternate]"
          />
          {/* Fundo radial BEM suave só atrás do texto */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_0%,transparent_60%)]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-medium uppercase tracking-wide leading-none mb-8 drop-shadow-xl">
            Referência em<br />Móveis Planejados
          </h1>
          <p className="text-white text-base md:text-lg font-light mx-auto mb-12 drop-shadow-md">
            Há mais de uma década, transformando espaços com sofisticação e praticidade.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => scrollToSection('ambientes')}
              className="bg-[#004041] border border-white/20 text-white px-12 py-4 text-xs font-light uppercase tracking-[0.2em] hover:bg-white hover:text-[#004041] transition-all duration-300"
            >
              Ambientes
            </button>
          </div>
        </div>
      </section>


      <section id="ambientes" className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 max-w-[1500px]">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <span className="text-[#e9ad81] font-light tracking-[0.2em] text-xs uppercase mb-4 block">CONHEÇA</span>
             <h2 className="text-2xl md:text-3xl tracking-widest font-medium text-stone-900 uppercase">NOSSOS AMBIENTES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Bloco 1 - Closets/Dormitorios */}
            <Link to="/galeria" className="block group relative aspect-square overflow-hidden bg-stone-100 rounded-2xl">
               <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Closets" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500"></div>
               <div className="absolute inset-0 p-8 flex flex-col justify-end">
                 <h3 className="text-white text-2xl font-medium mb-1 relative">Dormitórios</h3>
                 <p className="text-white/80 font-light tracking-wide text-sm flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 relative z-10">Ver Galeria <ArrowRight size={14}/></p>
                 <span className="absolute left-8 top-[calc(100%-2rem)] w-0 h-[1px] bg-[#e9ad81] transition-all duration-500 group-hover:w-16"></span>
               </div>
            </Link>

            {/* Bloco 2 - Cozinhas */}
            <Link to="/galeria" className="block group relative aspect-square overflow-hidden bg-stone-100 rounded-2xl">
               <img src="https://images.unsplash.com/photo-1556910103-1c02745a872f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Cozinhas" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500"></div>
               <div className="absolute inset-0 p-8 flex flex-col justify-end">
                 <h3 className="text-white text-2xl font-medium mb-1 relative">Cozinhas Gourmet</h3>
                 <p className="text-white/80 font-light tracking-wide text-sm flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 relative z-10">Ver Galeria <ArrowRight size={14}/></p>
                 <span className="absolute left-8 top-[calc(100%-2rem)] w-0 h-[1px] bg-[#e9ad81] transition-all duration-500 group-hover:w-16"></span>
               </div>
            </Link>

            {/* Bloco 3 - Salas */}
            <Link to="/galeria" className="block group relative aspect-square overflow-hidden bg-stone-100 rounded-2xl">
               <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Salas" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500"></div>
               <div className="absolute inset-0 p-8 flex flex-col justify-end">
                 <h3 className="text-white text-2xl font-medium mb-1 relative">Livings & Home</h3>
                 <p className="text-white/80 font-light tracking-wide text-sm flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 relative z-10">Ver Galeria <ArrowRight size={14}/></p>
                 <span className="absolute left-8 top-[calc(100%-2rem)] w-0 h-[1px] bg-[#e9ad81] transition-all duration-500 group-hover:w-16"></span>
               </div>
            </Link>

            {/* Bloco 4 - Corporativo */}
            <Link to="/galeria" className="block group relative aspect-square overflow-hidden bg-stone-100 rounded-2xl">
               <img src="https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Corporativo" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500"></div>
               <div className="absolute inset-0 p-8 flex flex-col justify-end">
                 <h3 className="text-white text-2xl font-medium mb-1 relative">Corporativos</h3>
                 <p className="text-white/80 font-light tracking-wide text-sm flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 relative z-10">Ver Galeria <ArrowRight size={14}/></p>
                 <span className="absolute left-8 top-[calc(100%-2rem)] w-0 h-[1px] bg-[#e9ad81] transition-all duration-500 group-hover:w-16"></span>
               </div>
            </Link>

            {/* Bloco 5 - Área Gourmet */}
            <Link to="/galeria" className="block group relative aspect-square overflow-hidden bg-stone-100 rounded-2xl">
               <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Edículas" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500"></div>
               <div className="absolute inset-0 p-8 flex flex-col justify-end">
                 <h3 className="text-white text-2xl font-medium mb-1 relative">Áreas Externas</h3>
                 <p className="text-white/80 font-light tracking-wide text-sm flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 relative z-10">Ver Galeria <ArrowRight size={14}/></p>
                 <span className="absolute left-8 top-[calc(100%-2rem)] w-0 h-[1px] bg-[#e9ad81] transition-all duration-500 group-hover:w-16"></span>
               </div>
            </Link>

            {/* Bloco 6 - Banheiros */}
            <Link to="/galeria" className="block group relative aspect-square overflow-hidden bg-stone-100 rounded-2xl">
               <img src="https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Banheiros" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500"></div>
               <div className="absolute inset-0 p-8 flex flex-col justify-end">
                 <h3 className="text-white text-2xl font-medium mb-1 relative">Banheiros & Spas</h3>
                 <p className="text-white/80 font-light tracking-wide text-sm flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 relative z-10">Ver Galeria <ArrowRight size={14}/></p>
                 <span className="absolute left-8 top-[calc(100%-2rem)] w-0 h-[1px] bg-[#e9ad81] transition-all duration-500 group-hover:w-16"></span>
               </div>
            </Link>
          </div>
        </div>
      </section>

      {/* GARANTIA (Premium) */}
      <section id="garantia" className="py-12 bg-stone-50/50">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 max-w-[1500px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Dark Card (Left) */}
            <div className="bg-[#004243] rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <span className="text-[#e9ad81] font-light tracking-[0.2em] text-[10px] uppercase mb-4 block">Garantia D'Mar Móveis</span>
                <h3 className="text-2xl md:text-3xl font-medium text-white leading-tight mb-8">
                  10 anos de segurança e pós-venda presente
                </h3>
                <p className="text-stone-300 font-light text-xs leading-relaxed mb-10 max-w-sm">
                  Nosso compromisso vai além da entrega. Nossa garantia protege seu investimento e garante acompanhamento real.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                    <p className="text-[#e9ad81] text-[10px] font-medium uppercase tracking-wider mb-1">Cobertura Ampla</p>
                    <p className="text-stone-400 text-[10px] leading-relaxed">Estrutura e acabamento.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                    <p className="text-[#e9ad81] text-[10px] font-medium uppercase tracking-wider mb-1">Equipe Dedicada</p>
                    <p className="text-stone-400 text-[10px] leading-relaxed">Suporte especializado.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content (Right) */}
            <div>
              <h2 className="text-2xl md:text-3xl tracking-[0.2em] font-medium text-stone-900 uppercase mb-6 leading-tight">
                10 ANOS DE <br/>
                <span className="text-[#e9ad81]">GARANTIA</span>
              </h2>
              <p className="text-stone-500 font-light leading-relaxed mb-6 text-sm max-w-md">
                A garantia D'Mar Móveis é um cuidado contínuo. Nossos processos são claros, registrados e pensados para resolver rapidamente qualquer necessidade. Você sente a diferença na segurança e no suporte.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Atendimento ágil com acompanhamento personalizado.',
                  'Critérios transparentes e orientações práticas.',
                  'Equipe preparada para manter seu móvel impecável.'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-stone-700 font-light text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e9ad81]"></div>
                    {item}
                  </li>
                ))}
              </ul>

              <button className="group flex items-center gap-4 bg-[#4B3B34] text-white px-8 py-3 text-[10px] font-light uppercase tracking-[0.2em] transition-all hover:bg-[#3d302a] shadow-lg shadow-black/5">
                Conhecer a garantia completa
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-2" />
              </button>
            </div>

          </div>
        </div>
      </section>

       {/* SOBRE NÓS / ESSÊNCIA */}
      <section id="sobre" className="py-12 bg-stone-50">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 max-w-[1500px]">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
            
            {/* Image (Left) - Balanced size */}
            <div className="w-full lg:w-5/12">
              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="D'Mar Interiores" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </div>

            {/* Text Content (Right) */}
            <div className="w-full lg:w-7/12">
              <div className="max-w-xl">
                <span className="text-[#e9ad81] font-light tracking-[0.2em] text-xs uppercase mb-4 block">CONHEÇA</span>
                
                <h2 className="text-2xl md:text-3xl tracking-widest font-medium text-stone-900 uppercase mb-10">
                  SOBRE NÓS
                </h2>
                
                <div className="space-y-6 text-stone-500 font-light leading-relaxed text-lg mb-12">
                  <p>
                    A D'Mar Planejados nasceu com um propósito claro: trazer exclusividade e alto padrão para cada ambiente que projetamos. Mais do que fabricar móveis, nós criamos o cenário onde a sua vida acontece.
                  </p>
                  <p>
                    Com anos de tradição e um olhar incansável para as tendências de design de interiores, nossa equipe une tecnologia de ponta e acabamento artesanal. Cada projeto é único, pensado milimetricamente para refletir o seu estilo de vida.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER LUXO */}
      <footer className="bg-[#004243] text-white pt-32 pb-12">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 max-w-[1500px]">
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
                <li><button onClick={() => scrollToSection('sobre')} className="text-stone-400 hover:text-white transition-colors text-sm font-light">O Manifesto</button></li>
                <li><button onClick={() => scrollToSection('ambientes')} className="text-stone-400 hover:text-white transition-colors text-sm font-light">Coleções</button></li>
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
