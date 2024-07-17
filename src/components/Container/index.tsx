import { useEffect } from "react";
import gsap from "gsap";

interface ContainerProps {
  children: React.ReactNode;
  isLight?: boolean;
}

function Container({ children, isLight }: ContainerProps) {
  const baseClasses =
    "h-auto min-h-screen flex justify-center py-[20px] items-center text-center relative overflow-hidden";
  const lightClasses = "bg-goose-grey text-warm-blue";
  const darkClasses = "bg-baltic-black text-harp-white";

  const ContainerClasses = `${baseClasses} ${
    isLight ? lightClasses : darkClasses
  }`;

  const BackgroundClasses = isLight
    ? "bg-backgroundDesktopBlue"
    : "bg-backgroundDesktopDark";

  useEffect(() => {
    gsap.fromTo(
      ".bg-image",
      { opacity: 1, x: 20, y: -20, repeat: -1 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 5,
        ease: "back",
        stagger: 0.4,
        yoyoEase: true,
        repeat: -1,
      }
    );
  }, []);

  return (
    <div className={ContainerClasses}>
      <div
        className={`absolute inset-0 ${BackgroundClasses} bg-image h-full w-full`}
      ></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default Container;
