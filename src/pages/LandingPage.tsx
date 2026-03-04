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

import bgImage from '../../public/fotoprincipal02.png';

const Hero = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  const { addLead } = useCRM();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await addLead({
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
    } catch (error) {
      console.error('Falha ao enviar lead:', error);
      alert('Houve um erro ao enviar seu orçamento. Por favor, tente novamente ou entre em contato pelo WhatsApp.');
    }
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
        {/* Camada escura por cima para os textos ficarem legíveis */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8">

        {/* Removendo a faixa verde sólida que cobria metade da tela para a imagem aparecer */}
        {/* <div className="absolute inset-y-0 w-[200vw] left-1/2 -translate-x-1/2 bg-[#004243]/95 z-[-1] shadow-2xl"></div> */}

        <div className="relative lg:pr-8">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white py-6 relative z-10"
          >
            <div className="mb-6">
              <img src="/logo-branca.png" alt="D'MAR Planejados" className="h-10 md:h-14 lg:h-16 w-auto object-contain" />
            </div>

            <h1 className="mb-4 text-white flex flex-col gap-1">
              <span className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide uppercase">
                Referência em
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-brand-accent">
                MÓVEIS PLANEJADOS
              </span>
            </h1>
            <p className="text-[11px] md:text-xs text-white/90 max-w-sm leading-[1.8] font-light tracking-widest uppercase">
              Há mais de 10 anos sendo<br />referência em móveis planejados<br />de alto padrão.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 shadow-2xl max-w-[400px] w-full mx-auto lg:ml-0 relative z-20 my-[-30px] lg:my-[-60px]"
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

const Pricing = () => {
  const plans = [
    {
      size: "50m²",
      price: "R$48.750,00",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop"
    },
    {
      size: "70m²",
      price: "R$68.250,00",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop"
    },
    {
      size: "90m²",
      price: "R$87.750,00",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop"
    },
    {
      size: "120m²",
      price: "R$117.000,00",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const benefits = [
    {
      title: "12x no Boleto",
      description: "Parcele em até 12 vezes sem juros"
    },
    {
      title: "Entrada p/ 30 dias",
      description: "Comece a pagar só daqui 30 dias"
    },
    {
      title: "Consultoria Grátis",
      description: "Atendimento personalizado sem custo"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Plan Cards as Pure Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { id: '50m', src: '/plano50m2.png', alt: 'Plano 50m²' },
            { id: '70m', src: '/plano50m2.png', alt: 'Plano 70m²' },
            { id: '90m', src: '/plano50m2.png', alt: 'Plano 90m²' },
            { id: '120m', src: '/plano50m2.png', alt: 'Plano 120m²' }
          ].map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img
                src={plan.src}
                alt={plan.alt}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 cursor-pointer drop-shadow-xl"
              />
            </motion.div>
          ))}
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              viewport={{ once: true }}
              className="bg-[#004243] rounded-2xl p-6 text-center border border-[#003031] shadow-lg"
            >
              <h4 className="text-white text-xl font-bold mb-2">{benefit.title}</h4>
              <p className="text-white/80 text-sm font-light">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#004243] text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            Sobre <span className="font-bold">Nós</span>
          </h2>

          <div className="space-y-4 text-white/90 font-light leading-relaxed text-base">
            <p>
              Há 15 anos, transformamos ambientes em experiências únicas através de móveis planejados que unem sofisticação, funcionalidade e alto padrão de acabamento.
            </p>
            <p>
              Somos uma empresa especializada em desenvolver projetos personalizados, pensados para refletir o estilo, as necessidades e o momento de cada cliente. Acreditamos que um ambiente bem planejado vai além da estética — ele melhora a rotina, valoriza o imóvel e traduz personalidade.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src="/fotoprincipal02.png"
            alt="Ambiente Planejado D'MAR"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const environments = [
    { title: "Closets", img: "/fotoprincipal02.png" },
    { title: "Cozinhas", img: "/fotoprincipal02.png" },
    { title: "Dormitórios", img: "/fotoprincipal02.png" },
    { title: "Salas", img: "/fotoprincipal02.png" },
    { title: "Home Office", img: "/fotoprincipal02.png" },
    { title: "Corporativo", img: "/fotoprincipal02.png" }
  ];

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            Nossos <span className="font-bold">Ambientes</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Projetos exclusivos desenvolvidos para cada espaço do seu dia a dia, unindo design e funcionalidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {environments.map((env, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-white shadow-lg cursor-pointer"
            >
              <img
                src={env.img}
                alt={env.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h4 className="text-white text-xl font-bold uppercase tracking-wider">{env.title}</h4>
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
      <div className="max-w-5xl mx-auto px-6">
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
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <img src="/logo-branca.png" alt="D'MAR Planejados" className="h-8 md:h-10 w-auto opacity-90 object-contain" />
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
        <Pricing />
        <About />
        <Portfolio />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
