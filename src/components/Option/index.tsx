interface OptionProps {
  onClick: () => void;
  isLight?: boolean;
  option: string;
  label: string;
  active: boolean;
  disabled: boolean;
}

function Option({
  onClick,
  isLight,
  option,
  label,
  active,
  disabled,
  ...props
}: OptionProps) {
  const baseClasses =
    "flex gap-7 items-center border-2 border-solid px-[15px] py-[10px] group w-full";
  const lightClasses = `border-warm-blue ${
    active && "bg-warm-blue"
  } hover:bg-warm-blue`;
  const darkClasses = `border-harp-white ${
    active && "bg-light-grey"
  } hover:bg-light-grey`;

  const buttonClasses = `${baseClasses} ${
    isLight ? lightClasses : darkClasses
  }`;

  const baseOptionClasses =
    "rounded-full h-[40px] w-[40px] flex items-center justify-center group-hover:border group-hover:border-solid";
  const lightOptionClasses = `bg-warm-blue ${
    active && "border border-solid border-harp-white"
  } group-hover:border-harp-white `;
  const darkOptionClasses = `bg-cool-grey ${
    active && "bg-light-grey border border-solid border-baltic-black"
  } group-hover:bg-light-grey group-hover:border-baltic-black text-harp-white`;

  const optionClasses = `${baseOptionClasses} ${
    isLight ? lightOptionClasses : darkOptionClasses
  }`;

  const baseOptionTextClasses =
    "px-[14px] py-[5px] font-bebas text-[16px] leading-[36px] center";
  const lightOptionTextClasses = "text-harp-white";
  const darkOptionTextClasses = "text-baltic-black";

  const optionTextClasses = `${baseOptionTextClasses} ${
    isLight ? lightOptionTextClasses : darkOptionTextClasses
  }`;

  const baseLabelClasses =
    "font-sora text-[16px] text-left";
  const lightLabelClasses = `${
    active ? "text-harp-white" : "text-warm-blue"
  } group-hover:text-harp-white`;
  const darkLabelClasses = `${
    active ? "text-baltic-black" : "text-harp-white"
  }  group-hover:text-baltic-black`;

  const labelClasses = `${baseLabelClasses} ${
    isLight ? lightLabelClasses : darkLabelClasses
  }`;

  return (
    <div className="optionBtn">
      <button
        {...props}
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled}
      >
        <div className={optionClasses}>
          <p className={optionTextClasses}>{option}</p>
        </div>
        <p className={labelClasses}>{label}</p>
      </button>
    </div>
  );
}
export default Option;
