'use client';

import { useState, useEffect } from 'react';

const items = [
  { 
    id: 1, 
    title: 'Exposição em Copabana', 
    description: 'Design de interfaces modernas e intuitivas',
    color: 'from-blue-500 to-cyan-400'
  },
  { 
    id: 2, 
    title: 'Simposio Brasileiro de Mulheres', 
    description: 'Sistemas web e aplicativos mobile',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    id: 3, 
    title: 'Mulheres na Consultoria', 
    description: 'Análise e otimização de processos',
    color: 'from-green-500 to-emerald-400'
  },
  { 
    id: 4, 
    title: 'Marketing', 
    description: 'Estratégias digitais e crescimento',
    color: 'from-orange-500 to-yellow-400'
  },
  { 
    id: 5, 
    title: 'Data Science', 
    description: 'Análise de dados e inteligência artificial',
    color: 'from-indigo-500 to-blue-400'
  },
  { 
    id: 6, 
    title: 'Mulheres no Deploy de aplicações', 
    description: 'Infraestrutura e deploy contínuo',
    color: 'from-pink-500 to-pink-200'
  },
];

export default function SimpleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1); // Começa no meio (índice 1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Adicionar itens duplicados no início e fim para rotação infinita
  const extendedItems = [items[items.length - 1], ...items, items[0]];

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isTransitioning]);

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    
    // Resetar posição após transição
    setTimeout(() => {
      setIsTransitioning(false);
      if (currentIndex === items.length) {
        setCurrentIndex(1); // Volta para o primeiro item real
      }
    }, 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    
    // Resetar posição após transição
    setTimeout(() => {
      setIsTransitioning(false);
      if (currentIndex === 0) {
        setCurrentIndex(items.length); // Vai para o último item real
      }
    }, 500);
  };

  // Calcular translateX baseado no currentIndex
  const translateX = `translateX(calc(-${currentIndex * 33.333}% + 33.333%))`;

  return (
    <div className="w-820 h-180 items center  px-4">
      {/* Título */}
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Nossos Serviços
      </h2>
      
      {/* Container principal */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Slides container com transform */}
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: translateX }}
        >
          {extendedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-1/3 px-2 shrink-0 flex items-center justify-center"
            >
              <div 
                className={`
                  bg-linear-to-br ${item.color} 
                  rounded-xl p-6 text-white
                   transition-all duration-500
                  ${index === currentIndex ? 'w-300 h-140 scale-100' : 'w-580 h-80 scale-80 opacity-70'}
                  shadow-lg
                `}
              >
                <div className="mb-2 text-3xl font-bold opacity-30">
                  {item.id.toString().padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm opacity-90">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botões de navegação */}
        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="absolute left-0 top-1/2 -translate-y-1/2  translate-x-230
                   bg-white hover:bg-gray-50 p-3 rounded-full 
                   shadow-lg transition-all z-30 disabled:opacity-50"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-230
                   bg-white hover:bg-gray-50 p-3 rounded-full 
                   shadow-lg transition-all z-30 disabled:opacity-50"
        >
          →
        </button>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setCurrentIndex(index + 1);
                }
              }}
              disabled={isTransitioning}
              className={`w-2 h-2 rounded-full transition-all ${
                index === (currentIndex - 1) % items.length
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              } ${isTransitioning ? 'pointer-events-none' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}