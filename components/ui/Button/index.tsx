
interface ButtonProps {
    label?: string;
}

const Button = ({label, ...props}: ButtonProps) =>{
    return(
        <button
            {...props}
        >
            {label}
        </button>
    )
}

export {Button}