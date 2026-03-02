import React, { useState } from 'react';
import {
  ChevronRight,
  Phone as PhoneIcon,
  Instagram,
  Facebook,
  User,
  Mail,
  Store,
  DollarSign,
  MessageSquare,
  Layout,
  Coffee,
  Bed,
  Utensils,
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useCRM } from '../context/CRMContext';

import bgImage from '../../public/fundo-sala.jpg';

const Hero = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  const { addLead } = useCRM();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    addLead({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      store: formData.get('store') as string,
      investment: formData.get('investment') as string,
      environments: formData.get('environments') as string,
    });

    setFormStatus('success');
    e.currentTarget.reset();

    setTimeout(() => {
      setFormStatus('idle');
    }, 5000);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-gray-50">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Interior de luxo"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center py-16">

        <div className="relative pl-4 md:pl-8">
          {/* Green block background extending to the left edge of the screen */}
          <div className="absolute inset-y-0 right-0 w-[200vw] bg-[#004243]/90 z-[-1] hidden lg:block shadow-2xl" style={{ transform: 'translateX(-100%)', left: '100%' }}></div>
          {/* Green block background for mobile */}
          <div className="absolute inset-0 w-[200vw] bg-[#004243]/90 z-[-1] lg:hidden -ml-[100vw]"></div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white py-8 relative z-10"
          >
            <div className="mb-6 flex items-center gap-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <div className="flex flex-col">
                <h2 className="text-2xl tracking-[0.3em] font-light leading-none text-white">D'MAR</h2>
                <p className="text-white/80 text-[10px] tracking-[0.4em] uppercase mt-1.5 font-medium">Planejados</p>
              </div>
            </div>

            <h1 className="mb-6 text-white flex flex-col gap-1">
              <span className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide uppercase">
                Referência em
              </span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                MÓVEIS PLANEJADOS
              </span>
            </h1>
            <p className="text-xs md:text-sm text-white/90 max-w-sm leading-[1.8] font-light tracking-widest uppercase">
              Há mais de 10 anos sendo<br />referência em móveis planejados<br />de alto padrão.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-2xl max-w-md w-full mx-auto lg:ml-auto relative z-20 my-[-30px] lg:my-[-60px]"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl text-gray-900 font-medium mb-1">
              Solicite seu <span className="text-[#004243] font-bold">Orçamento</span>
            </h3>
            <p className="text-gray-500 text-xs">Visualize seu projeto em <span className="font-bold text-gray-800">24H</span></p>
          </div>

          {formStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm text-center"
            >
              Orçamento enviado com sucesso! Entraremos em contato em breve.
            </motion.div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-xs text-gray-600 font-medium ml-1">Nome</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  name="name"
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#004243] focus:ring-1 focus:ring-[#004243] transition-colors placeholder-gray-400 text-sm"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-600 font-medium ml-1">E-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#004243] focus:ring-1 focus:ring-[#004243] transition-colors placeholder-gray-400 text-sm"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-600 font-medium ml-1">Telefone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <PhoneIcon size={16} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#004243] focus:ring-1 focus:ring-[#004243] transition-colors placeholder-gray-400 text-sm"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Store size={16} />
                  </div>
                  <select name="store" className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#004243] focus:ring-1 focus:ring-[#004243] transition-colors appearance-none text-sm" required>
                    <option value="">Escolha uma loja</option>
                    <option value="sp">São Paulo - Matriz</option>
                    <option value="rj">Rio de Janeiro</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <ChevronRight size={14} className="rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <DollarSign size={16} />
                  </div>
                  <select name="investment" className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#004243] focus:ring-1 focus:ring-[#004243] transition-colors appearance-none text-sm" required>
                    <option value="">Investimento</option>
                    <option value="10k">Até R$ 10.000</option>
                    <option value="50k">R$ 10.000 a R$ 50.000</option>
                    <option value="100k">Acima de R$ 50.000</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <ChevronRight size={14} className="rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-600 font-medium ml-1">Quais ambientes deseja orçamento?</label>
              <div className="relative">
                <div className="absolute top-2.5 left-0 pl-3 flex items-start pointer-events-none text-gray-400">
                  <MessageSquare size={16} />
                </div>
                <textarea
                  name="environments"
                  rows={2}
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#004243] focus:ring-1 focus:ring-[#004243] transition-colors placeholder-gray-400 resize-none text-sm"
                  placeholder="Ex: Cozinha, Sala, Dormitório..."
                  required
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#004243] text-white font-bold py-3.5 rounded-lg hover:bg-[#003031] transition-colors mt-2 tracking-wider text-sm shadow-md"
            >
              ENVIAR SOLICITAÇÃO
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Cozinhas",
      description: "O coração da casa com ergonomia e materiais de alta resistência.",
      icon: <Utensils size={32} />,
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Dormitórios",
      description: "Refúgios de tranquilidade com organização inteligente e conforto.",
      icon: <Bed size={32} />,
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Home Office",
      description: "Produtividade e foco em ambientes desenhados para o seu fluxo.",
      icon: <Layout size={32} />,
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Salas de Estar",
      description: "Elegância e acolhimento para receber e relaxar com estilo.",
      icon: <Coffee size={32} />,
      image: "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Soluções <span className="font-bold text-brand-accent">Completas</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Desenvolvemos projetos personalizados para cada cômodo da sua residência ou empresa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 hover:border-brand-accent/50 transition-colors"
            >
              <div className="text-brand-accent mb-6">{service.icon}</div>
              <h3 className="text-xl font-medium mb-3">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=800&auto=format&fit=crop"
  ];

  return (
    <section id="portfolio" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-light mb-4">Projetos que <span className="font-bold text-brand-accent">Inspiram</span></h2>
            <p className="text-gray-400 font-light">
              Uma seleção de nossos trabalhos mais recentes, onde a visão do cliente se torna realidade tangível.
            </p>
          </div>
          <button className="text-brand-accent font-medium flex items-center gap-2 hover:gap-3 transition-all uppercase text-sm tracking-widest">
            Ver galeria <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-white/5"
            >
              <img
                src={img}
                alt={`Projeto ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <h4 className="text-white text-lg font-medium mb-1">Residência Jardim Europa</h4>
                <p className="text-brand-accent text-xs uppercase tracking-widest">Cozinha & Área Gourmet</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mariana Silva",
      role: "Arquiteta",
      content: "A D'Mar é minha parceira número um. A precisão dos cortes e o acabamento final são impecáveis, superando sempre as expectativas dos meus clientes.",
      avatar: "https://i.pravatar.cc/150?u=mariana"
    },
    {
      name: "Ricardo Oliveira",
      role: "Empresário",
      content: "Fizemos todo o escritório com eles. Além da beleza, a funcionalidade dos móveis ajudou muito na organização do nosso dia a dia.",
      avatar: "https://i.pravatar.cc/150?u=ricardo"
    },
    {
      name: "Juliana Costa",
      role: "Proprietária",
      content: "Minha cozinha ficou um sonho! O atendimento foi excelente desde o primeiro contato até a montagem final, que foi muito limpa e rápida.",
      avatar: "https://i.pravatar.cc/150?u=juliana"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl text-center mb-16 font-light">O que dizem nossos <span className="font-bold text-brand-accent">clientes</span></h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[#1A1A1A] border border-white/5 relative"
            >
              <div className="text-brand-accent mb-6 text-xl">
                {"★".repeat(5)}
              </div>
              <p className="text-gray-300 italic mb-8 font-light leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-white/10" />
                <div>
                  <h4 className="font-medium text-sm">{t.name}</h4>
                  <p className="text-xs text-brand-accent uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-accent">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-lg tracking-[0.2em] font-light">D'MAR</span>
        </div>
        <div className="text-xs text-gray-500 font-light">
          © {new Date().getFullYear()} D'Mar Móveis Planejados. Todos os direitos reservados.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-brand-accent transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-brand-accent transition-colors"><Facebook size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a
    href="https://wa.me/5511999999999"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
  >
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  </a>
);

export default function LandingPage() {
  return (
    <div className="selection:bg-brand-accent selection:text-black">
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
