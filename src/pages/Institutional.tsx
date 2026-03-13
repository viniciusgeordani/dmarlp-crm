import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, MapPin, Instagram, Facebook, LayoutDashboard, ChevronRight, PaintBucket } from 'lucide-react';

export default function Institutional() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito de sombra e background no menu ao rolar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    <div className="min-h-screen font-sans bg-stone-50 text-stone-900 selection:bg-[#004243] selection:text-white">
      {/* Section: Diferenciais (Stats / Features) */}
      <section id="diferenciais" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Shield, title: "10 Anos de Garantia", desc: "Tranquilidade total com a maior garantia do mercado em sua marcenaria." },
              { icon: Clock, title: "Entrega Pontual", desc: "Respeitamos seu tempo. Cronograma levado a sério do início ao fim." },
              { icon: Star, title: "Qualidade Premium", desc: "Utilizamos apenas materiais de primeira linha e ferragens importadas." },
              { icon: PaintBucket, title: "Design Exclusivo", desc: "Projetos 100% personalizados para atender ao seu estilo de vida." },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-start group">
                <div className="w-16 h-16 rounded-2xl bg-[#004243]/5 flex items-center justify-center text-[#004243] mb-6 group-hover:bg-[#004243] group-hover:text-white transition-colors duration-300">
                  <feature.icon strokeWidth={1.5} size={28} />
                </div>
                <h3 className="text-xl text-stone-900 font-bold mb-3">{feature.title}</h3>
                <p className="text-stone-500 leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Portfólio (Galeria de Ambientes) */}
      <section id="portfolio" className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#c6a87c] font-bold tracking-widest text-sm uppercase mb-3 block">Nosso Portfólio</span>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">Inspire-se com<br/>nossas entregas.</h2>
            </div>
            <Link to="/lp" className="inline-flex items-center gap-2 text-[#004243] font-bold hover:gap-4 transition-all uppercase tracking-wide text-sm">
              Solicitar Orçamento <ArrowRight size={18} />
            </Link>
          </div>

          {/* Grid de Fotos (Imagens de Exemplo Unsplash) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer lg:col-span-2">
              <img src="https://images.unsplash.com/photo-1556910103-1c02745a872f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Cozinha Planejada" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-[#c6a87c] font-bold text-xs uppercase tracking-widest mb-2 block">Cozinhas</span>
                <h3 className="text-2xl font-bold text-white">Elegância em cada detalhe</h3>
              </div>
            </div>
            
            <div className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sala de Estar" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-[#c6a87c] font-bold text-xs uppercase tracking-widest mb-2 block">Salas & Home</span>
                <h3 className="text-xl font-bold text-white">Conforto Sofisticado</h3>
              </div>
            </div>

            <div className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Quarto Casal" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-[#c6a87c] font-bold text-xs uppercase tracking-widest mb-2 block">Dormitórios</span>
                <h3 className="text-xl font-bold text-white">Refúgio Íntimo</h3>
              </div>
            </div>

            <div className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer lg:col-span-2">
              <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Closet Planejado" className="w-full h-full object-cover object-left transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-[#c6a87c] font-bold text-xs uppercase tracking-widest mb-2 block">Closets</span>
                <h3 className="text-2xl font-bold text-white">Organização Perfeita</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Sobre Nós */}
      <section id="sobre" className="py-24 bg-[#002829] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          {/* Elemento de background decorativo */}
           <div className="absolute right-[-10%] top-[-10%] w-[600px] h-[600px] rounded-full border border-white/20"></div>
           <div className="absolute right-[5%] top-[10%] w-[400px] h-[400px] rounded-full border border-white/20"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#c6a87c] font-bold tracking-widest text-sm uppercase mb-4 block">A D'Mar Planejados</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">Tradição em criar <br/>espaços que abraçam.</h2>
              
              <div className="space-y-6 text-white/70 font-light leading-relaxed text-lg">
                <p>Nascemos do desejo de transformar casas em lares verdadeiramente únicos. Entendemos que seu móvel não é apenas madeira cortada, mas o cenário onde as memórias da sua família serão construídas pelas próximas décadas.</p>
                <p>Com fábricas modernas, profissionais altamente capacitados e um rigoroso padrão de qualidade, garantimos que o projeto dos seus sonhos sairá do papel exatamente como você imaginou, com entrega no prazo e acabamento impecável.</p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                <div>
                  <h4 className="text-4xl font-bold text-[#c6a87c] mb-2">+2.000</h4>
                  <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Projetos Entregues</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-[#c6a87c] mb-2">2x</h4>
                  <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Lojas Físicas (SP e RJ)</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1581428982868-e410ddf60ea7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Processo de Fabricação / Atendimento" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl max-w-xs">
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
                </div>
                <p className="text-stone-800 font-bold className text-lg leading-tight">"A melhor escolha que fiz para minha casa nova. Atendimento e qualidade impecáveis!"</p>
                <p className="text-stone-500 text-sm mt-4 font-medium">— Maria Eduarda S.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Rodapé Institucional */}
      <footer className="bg-[#001c1d] text-white pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <img src="https://dmarplanejados.com.br/wp-content/uploads/2025/02/LOGOMARCA_DMAR_19.02.png" alt="D'Mar Planejados" className="h-12 mb-6" />
              <p className="text-white/60 font-light leading-relaxed mb-6 text-sm">
                Transformando ambientes e realizando sonhos através de projetos de alto padrão e design exclusivo.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://instagram.com/dmarplanejados" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c6a87c] hover:text-[#001c1d] transition-all">
                  <Instagram size={18} />
                </a>
                <a href="https://facebook.com/dmarplanejados" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c6a87c] hover:text-[#001c1d] transition-all">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Links Rápidos</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('sobre')} className="text-white/60 hover:text-[#c6a87c] transition-colors text-sm">Nossa História</button></li>
                <li><button onClick={() => scrollToSection('diferenciais')} className="text-white/60 hover:text-[#c6a87c] transition-colors text-sm">Por que a D'Mar</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className="text-white/60 hover:text-[#c6a87c] transition-colors text-sm">Portfólio de Ambientes</button></li>
                <li><Link to="/admin-painel-crm-dmar" className="text-white/60 hover:text-[#c6a87c] transition-colors text-sm flex items-center gap-2"><LayoutDashboard size={14}/> Área do Lojista</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Nossas Unidades</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin size={18} className="text-[#c6a87c] shrink-0 mt-0.5" />
                  <span><strong>Loja São Paulo</strong><br />Avenida Exemplo, 1000<br />São Paulo - SP</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin size={18} className="text-[#c6a87c] shrink-0 mt-0.5" />
                  <span><strong>Loja Rio de Janeiro</strong><br />Avenida Exemplo, 500<br />Rio de Janeiro - RJ</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Fale Conosco</h4>
              <p className="text-sm text-white/60 mb-6">Pronto para dar o primeiro passo no seu projeto exclusivo?</p>
              <Link to="/lp" className="w-full bg-[#c6a87c] hover:bg-[#b0966f] text-[#001c1d] px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wide flex items-center justify-center transition-all shadow-lg hover:-translate-y-0.5">
                Faça seu Orçamento
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
            <p>&copy; {new Date().getFullYear()} D'Mar Planejados. Todos os direitos reservados.</p>
            <p className="mt-2 md:mt-0">Feito com foco em performance e alto padrão.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
