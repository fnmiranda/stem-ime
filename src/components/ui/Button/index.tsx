import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    label?: string;
    className?: string;
}

const Button = ({label,className, ...props}: ButtonProps) =>{
    return(
        <button
            className={className}
            {...props}
        > 
        </button>
    )
}

export {Button}