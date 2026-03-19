import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, CheckCircle2, ChevronDown, ShieldCheck, Star, 
  Download, Quote, ArrowRight, List, Gift, Bookmark, LayoutTemplate,
  ChevronLeft, ChevronRight, RefreshCw
} from 'lucide-react';

const CTAButton = ({ text, className = "", href }: { text: string, className?: string, href?: string }) => {
  const baseClasses = `bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-extrabold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:shadow-[0_0_30px_rgba(250,204,21,0.7)] transition-all duration-300 text-lg uppercase tracking-wide w-full flex items-center justify-center gap-2 ${className}`;
  
  if (href) {
    return (
      <motion.a 
        href={href}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
      >
        {text}
        <ArrowRight className="w-5 h-5" />
      </motion.a>
    );
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
    >
      {text}
      <ArrowRight className="w-5 h-5" />
    </motion.button>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-700 py-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-semibold text-white"
      >
        <span className="text-base pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform text-slate-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-2 text-sm text-slate-200 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImageCarousel = ({ images }: { images: { src: string, alt: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-xl border border-slate-700 group">
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img.src} alt={img.alt} className="w-full h-auto object-cover shrink-0" />
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentIndex ? 'bg-yellow-400' : 'bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </div>
  );
};

const SalesNotification = () => {
  const [currentSale, setCurrentSale] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const sales = [
    { name: "Marcos S.", city: "São Paulo, SP", time: "há 2 minutos" },
    { name: "Helena C.", city: "Rio de Janeiro, RJ", time: "há 5 minutos" },
    { name: "Antônio R.", city: "Belo Horizonte, MG", time: "há 12 minutos" },
    { name: "Cláudia M.", city: "Curitiba, PR", time: "há 1 minuto" },
    { name: "Ricardo F.", city: "Salvador, BA", time: "há 8 minutos" },
    { name: "João P.", city: "Fortaleza, CE", time: "há 4 minutos" },
    { name: "Maria L.", city: "Porto Alegre, RS", time: "há 15 minutos" },
  ];

  React.useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    const cycleTimer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSale((prev) => (prev === sales.length - 1 ? 0 : prev + 1));
        setIsVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(cycleTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-4 left-4 z-50 bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-xl p-2 sm:p-3 shadow-2xl flex items-center gap-2 sm:gap-3 max-w-[220px] sm:max-w-[280px]"
        >
          <div className="bg-yellow-400/20 p-1.5 sm:p-2 rounded-lg text-yellow-400 shrink-0">
            <ShieldCheck className="w-4 h-4 sm:w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-[11px] sm:text-xs text-slate-100 font-bold truncate">
              {sales[currentSale].name}
            </p>
            <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">
              Adquiriu o Guia • {sales[currentSale].time}
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-500 hover:text-slate-300 ml-auto shrink-0"
          >
            <ChevronDown className="w-3 h-3 sm:w-4 h-4 rotate-90" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TestimonialCarousel = ({ testimonials }: { testimonials: { text: string, author: string, image: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full overflow-hidden group">
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {testimonials.map((testimonial, i) => (
          <div key={i} className="w-full shrink-0 px-1">
            <div className="bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-700 shadow-xl relative min-h-[220px] flex flex-col justify-center">
              <Quote className="w-6 h-6 text-yellow-400/10 absolute top-3 right-3" />
              
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-11 h-11 rounded-full object-cover border-2 border-yellow-400 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-bold text-base text-yellow-300 leading-tight">{testimonial.author}</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
              </div>

              <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-slate-900/80 text-white p-1.5 rounded-full shadow-lg border border-slate-700 hover:bg-yellow-400 hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-1"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-slate-900/80 text-white p-1.5 rounded-full shadow-lg border border-slate-700 hover:bg-yellow-400 hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 translate-x-1 group-hover:-translate-x-1"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="flex justify-center gap-1.5 mt-4">
        {testimonials.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-yellow-400 w-4' : 'bg-slate-700 hover:bg-slate-500'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-yellow-400/30">
      <SalesNotification />
      
      {/* Top Discount Bar */}
      <div className="bg-yellow-500 text-slate-900 text-center py-2.5 px-4 text-xs sm:text-sm font-bold tracking-wider uppercase sticky top-0 z-50 shadow-md flex items-center justify-center gap-2">
        <span className="text-base">🔥</span>
        <span>Oferta Especial: 60% de desconto hoje!</span>
      </div>

      {/* 1. Hero (Mobile Focused) */}
      <header className="bg-slate-900 text-white pt-10 pb-12 px-4 relative overflow-hidden">
        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="font-serif text-4xl font-bold leading-tight mb-5 text-stone-50 tracking-tight">
            Você já notou que certos <span className="text-yellow-300 italic">números</span> se repetem na Bíblia?
          </h1>
          <p className="text-lg font-medium text-slate-100 mb-8 leading-relaxed">
            Descubra o significado bíblico dos números de Gênesis a Apocalipse e transforme seu estudo.
          </p>
          
          <img 
            src="https://i.ibb.co/8DypMG3q/Chat-GPT-Image-17-de-mar-de-2026-15-45-12.png" 
            alt="Capa do Guia Numerologia Bíblica" 
            className="w-4/5 max-w-[280px] h-auto rounded-xl shadow-[0_25px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10 mb-6"
            referrerPolicy="no-referrer"
          />

          <ul className="space-y-3 mb-8 text-left w-full px-4">
            {[
              "Mais de 40 números explicados",
              "Estudo 100% Bíblico",
              "Sem misticismo ou teologuês"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-100 text-base font-semibold">
                <CheckCircle2 className="w-6 h-6 text-yellow-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="w-full space-y-3">
            <CTAButton text="Quero meu acesso agora" href="#oferta" />
            <div className="flex justify-center items-center gap-2 text-xs text-slate-400 font-medium">
              <Download className="w-3 h-3"/> Acesso imediato • <BookOpen className="w-3 h-3"/> Guia Digital • <span className="text-yellow-300">R$ 19,90</span>
            </div>
          </div>
        </div>
      </header>


      {/* 3. O que você vai receber (Estrutura do Guia) */}
      <section className="py-12 px-4 bg-slate-900">
        <div className="max-w-md mx-auto">
          <h2 className="font-serif text-3xl font-bold text-white mb-4 text-center tracking-tight">
            O que você vai receber?
          </h2>
          <p className="text-base font-medium text-slate-100 mb-8 text-center leading-relaxed">
            Conheça a estrutura completa do Guia Numerologia Bíblica e veja tudo o que preparamos para você.
          </p>
          
          <div className="space-y-4 mb-8">
            
            {/* Item 1 */}
            <div className="bg-slate-800 rounded-xl shadow-md border border-slate-700 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-yellow-400/20 p-2 rounded-lg text-yellow-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white">1. O Guia Completo</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-100 ml-11">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Apresentação e Introdução:</strong> Diferença entre numerologia bíblica e mística.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Como usar o material:</strong> Dicas para estudo pessoal, em grupo ou como guia de consulta.</span></li>
              </ul>
            </div>

            {/* Item 2 */}
            <div className="bg-slate-800 rounded-xl shadow-md border border-slate-700 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-yellow-400/20 p-2 rounded-lg text-yellow-400">
                  <List className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white">2. Estudo Estruturado</h3>
              </div>
              <p className="text-sm text-slate-100 ml-11 mb-3">Mais de 20 números divididos em categorias lógicas:</p>
              <ul className="space-y-2 text-sm text-slate-100 ml-11">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Fundamentos:</strong> 1, 2, 3 e 4.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Centrais:</strong> 5, 6, 7, 8, 9, 10 e 12.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Proféticos:</strong> 40, 70, 100 e 1000.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Apocalipse:</strong> 144.000, 666, 7 selos e trombetas.</span></li>
              </ul>
            </div>

            {/* Item 3 */}
            <div className="bg-slate-800 rounded-xl shadow-md border border-slate-700 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-yellow-400/20 p-2 rounded-lg text-yellow-400">
                  <LayoutTemplate className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white">3. Padrão Fixo por Número</h3>
              </div>
              <p className="text-sm text-slate-100 ml-11 mb-3">Cada número possui uma estrutura profissional para facilitar o aprendizado:</p>
              <ul className="space-y-2 text-sm text-slate-100 ml-11">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span>Significado principal e onde aparece na Bíblia.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span>Padrão bíblico e explicação simples (sem teologuês).</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span>Aplicação prática e curiosidades que prendem a atenção.</span></li>
              </ul>
            </div>

            {/* Item 4 */}
            <div className="bg-slate-800 rounded-xl shadow-md border border-slate-700 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-yellow-400/20 p-2 rounded-lg text-yellow-400">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white">4. Capítulos de Consulta</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-100 ml-11">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Tabela Geral:</strong> Resumo rápido com número, significado e referência.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Guia Final:</strong> Como observar padrões, aplicar na leitura e evitar interpretações erradas.</span></li>
              </ul>
            </div>

            {/* Item 5 */}
            <div className="bg-yellow-900/20 rounded-xl shadow-md border border-yellow-700/50 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-yellow-400 p-2 rounded-lg text-slate-900">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-yellow-300">5. Bônus Exclusivos</h3>
              </div>
              <ul className="space-y-2 text-sm text-yellow-50 ml-11 font-medium">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span><strong className="text-yellow-200">Bônus 1:</strong> Resumo visual dos números.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span><strong className="text-yellow-200">Bônus 2:</strong> Símbolos bíblicos explicados.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> <span><strong className="text-yellow-200">Bônus 3:</strong> Apocalipse Revelado (Símbolos e Criaturas).</span></li>
              </ul>
            </div>

          </div>

          <CTAButton text="Quero meu acesso agora" href="#oferta" />
        </div>
      </section>

      {/* 4. Veja o Material */}
      <section className="py-12 px-4 bg-slate-800/50">
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-3 tracking-tight">
            Veja o material por dentro
          </h2>
          <p className="text-base font-medium text-slate-100 mb-8">
            Design limpo, leitura agradável e direto ao ponto.
          </p>
          <div className="flex flex-col gap-8">
            <ImageCarousel 
              images={[
                { src: "https://i.ibb.co/RGL8w9vw/Chat-GPT-Image-18-de-mar-de-2026-13-40-53.png", alt: "Amostra 1 do Guia" },
                { src: "https://i.ibb.co/3YFRXY58/Chat-GPT-Image-18-de-mar-de-2026-13-41-01-1.png", alt: "Amostra 2 do Guia" },
                { src: "https://i.ibb.co/mV0MDNGM/Chat-GPT-Image-18-de-mar-de-2026-13-41-13.png", alt: "Amostra 3 do Guia" }
              ]}
            />
          </div>
          <div className="mt-8">
            <CTAButton text="Quero ter acesso" href="#oferta" />
          </div>
        </div>
      </section>

      {/* 5. Depoimentos */}
      <section className="py-10 px-4 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-md mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center mb-10 tracking-tight">
            O que dizem os leitores
          </h2>
          
          <TestimonialCarousel 
            testimonials={[
              {
                text: "Sempre tive curiosidade sobre os números em Apocalipse. Este material explicou tudo de forma muito clara, sem invenções místicas. Muito bíblico.",
                author: "Pr. Marcos Silva",
                image: "https://i.ibb.co/spHZd3vR/pastor-ailton.png"
              },
              {
                text: "Uso o guia para preparar minhas aulas da Escola Bíblica. A linguagem é simples e o conteúdo é riquíssimo. Meus alunos estão amando!",
                author: "Helena Costa",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
              },
              {
                text: "Abriu minha mente para um estudo muito mais gostoso e focado. Recomendo a todos os irmãos da igreja.",
                author: "Antônio Ribeiro",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
              }
            ]}
          />
        </div>
      </section>

      {/* 5. Offer (Mobile Optimized) */}
      <section className="py-12 px-4 bg-slate-800/50" id="oferta">
        <div className="max-w-md mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-3 text-center text-white tracking-tight">
            Escolha o seu pacote
          </h2>
          <p className="text-slate-300 text-base font-medium mb-8 text-center">
            Comece hoje mesmo a entender o Apocalipse.
          </p>

          <div className="flex flex-col gap-6">
            {/* Pacote Básico */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg relative">
              <h3 className="text-xl font-bold text-white mb-2">Pacote Básico</h3>
              <p className="text-sm text-slate-400 mb-6">Apenas o guia principal para começar.</p>
              
              <div className="flex items-end gap-1 mb-6">
                <span className="text-sm text-slate-400 font-bold mb-1">R$</span>
                <span className="text-4xl font-extrabold text-white tracking-tight">10,00</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm text-slate-200">Guia Principal: Os Números de Apocalipse</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm text-slate-200">Acesso Vitalício e Imediato</span>
                </div>
              </div>

              <motion.a 
                href="https://www.ggcheckout.com/checkout/v5/wrrak98YxnpzCJaVQy3Z"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm uppercase tracking-wide border-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors block text-center"
              >
                Quero o Pacote Básico
              </motion.a>
            </div>

            {/* Pacote Completo */}
            <div className="bg-slate-800 rounded-2xl p-6 border-2 border-yellow-400 shadow-[0_15px_40px_rgba(250,204,21,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-3xl -mr-16 -mt-16 rounded-full"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 text-[10px] font-black px-3 py-1 rounded-b-lg uppercase tracking-widest shadow-md">
                Mais Recomendado
              </div>
              
              <h3 className="text-xl font-bold text-yellow-400 mb-2 mt-2">Pacote Completo</h3>
              <p className="text-sm text-slate-300 mb-6">A experiência definitiva de estudo.</p>
              
              <div className="flex items-end gap-1 mb-2">
                <span className="text-sm text-slate-400 font-bold mb-1">R$</span>
                <span className="text-4xl font-extrabold text-yellow-400 tracking-tight">19,90</span>
              </div>
              <p className="text-xs text-slate-400 line-through mb-6">De R$ 177,00</p>

              <div className="space-y-3 mb-8 relative">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />
                  <span className="text-sm text-slate-100 font-semibold">Guia Principal: Os Números de Apocalipse</span>
                </div>
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-yellow-400 shrink-0" />
                  <span className="text-sm text-slate-200"><strong className="text-yellow-400">Bônus 1:</strong> Resumo Visual dos Números</span>
                </div>
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-yellow-400 shrink-0" />
                  <span className="text-sm text-slate-200"><strong className="text-yellow-400">Bônus 2:</strong> Dicionário de Símbolos</span>
                </div>
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-yellow-400 shrink-0" />
                  <span className="text-sm text-slate-200"><strong className="text-yellow-400">Bônus 3:</strong> Apocalipse Revelado</span>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-blue-400 shrink-0" />
                  <span className="text-sm text-slate-200">Atualizações Gratuitas</span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm text-slate-200">Acesso Vitalício e Imediato</span>
                </div>
              </div>

              <CTAButton text="Quero o Pacote Completo" href="https://ggcheckout.com.br/checkout/v5/VAJ5BNvfgvgFULBR3wB1" />
              
              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                <span>Pagamento seguro • 7 dias de garantia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ (Compact) */}
      <section className="py-12 px-4 bg-slate-900">
        <div className="max-w-md mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center text-white mb-8 tracking-tight">
            Dúvidas Frequentes
          </h2>
          <div className="space-y-1">
            <FAQItem 
              question="Como recebo o material?" 
              answer="Por e-mail, logo após a confirmação do pagamento. O acesso é imediato."
            />
            <FAQItem 
              question="Funciona no celular?" 
              answer="Sim! O material pode ser lido facilmente no celular, tablet ou computador."
            />
            <FAQItem 
              question="Promove misticismo?" 
              answer="Não. O estudo é 100% fundamentado na Bíblia, rejeitando interpretações esotéricas."
            />
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-slate-950 text-slate-300 py-10 px-4 text-center text-xs">
        <div className="max-w-md mx-auto">
          <p className="mb-6 text-base font-serif italic text-slate-200 leading-relaxed">
            "Lâmpada para os meus pés é tua palavra..." - Sl 119:105
          </p>
          <p className="font-semibold">&copy; {new Date().getFullYear()} Numerologia Bíblica.</p>
          <p className="mt-1">Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}
