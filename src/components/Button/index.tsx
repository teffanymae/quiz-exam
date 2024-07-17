interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  isLight?: boolean;
}

function Button({ onClick, disabled, children, isLight }: ButtonProps) {
  const baseClasses = "m-auto px-[38px] py-[19px] font-sora text-[16px]";
  const lightClasses =
    "bg-warm-blue text-harp-white disabled:bg-geyser-grey disabled:text-ash-grey";
  const darkClasses =
    "bg-cool-grey text-baltic-black disabled:bg-lite-grey disabled:text-gravel-black";

  const buttonClasses = `${baseClasses} ${
    isLight ? lightClasses : darkClasses
  }`;

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
export default Button;
