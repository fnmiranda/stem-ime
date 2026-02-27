import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  children?: ReactNode; 
  className?: string;   
}

const Card = ({ title, description, image, children, className = "" }: CardProps) => {
  return (
    <div className={`max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-hover hover:shadow-md ${className}`}>
      
      {/* Imagem do Card */}
      {image && (
        <img 
          className="h-48 w-full object-cover" 
          src={image} 
          alt={title || "Card image"} 
        />
      )}

      {/* Conteúdo */}
      <div className="p-5">
        {title && (
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
        )}
        
        {description && (
          <p className="mb-3 font-normal text-gray-700">
            {description}
          </p>
        )}

        {/* Slot para botões ou conteúdo extra */}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;