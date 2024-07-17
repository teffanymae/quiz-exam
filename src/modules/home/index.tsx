import { useRef, useEffect } from "react";
import { useHomeService } from "./useHomeService";
import gsap from "gsap";

const bgSound = new Audio("src/assets/audio/bg-sound.mp3");

function HomeModule() {
  const { toQuizPage } = useHomeService();

  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const playAudio = () => {
      bgSound
        .play()
        .catch((error) => console.log("Audio play prevented:", error));
      document.removeEventListener("click", playAudio);
    };

    document.addEventListener("click", playAudio);

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;

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

    if (text) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "bounce",
          stagger: 0.1,
          yoyoEase: true,
        }
      );
    }

    gsap.fromTo(
      ".logo",
      { opacity: 0 },
      { delay: 1, stagger: 0.25, opacity: 1, duration: 2 }
    );

    if (box) {
      gsap.to(box, {
        x: 20,
        direction: "right",
        duration: 1,
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  const text = "QUIZZLER";
  const characters = text.split("");

  return (
    <>
      <div className="fixed inset-0 bg-backgroundDesktop bg-image h-full w-full" />
      <div className="bg-warm-blue h-screen px-20 flex justify-end items-center text-harp-white">
        <div className="text-harp-white text-right">
          <p className="font-bebas text-[280px] leading-[212.8px]">
            {characters.map((char, index) => (
              <span
                key={index}
                ref={(el) => {
                  if (el) textRef.current[index] = el;
                }}
                style={{ display: "inline-block" }}
              >
                {char}
              </span>
            ))}
          </p>
          <div className="logo flex gap-4 justify-end mb-[50px]">
            <p>BY</p>
            <img
              src="src/assets/images/forge.svg"
              className="h-[54px] w-[174px]"
            />
          </div>
          <button className="font-sora text-[32px]" onClick={toQuizPage}>
            <div ref={boxRef}>
              <div className="flex gap-1 items-center">
                <p>Let’s start the quiz</p>
                <img src="src/assets/images/arrow-right.svg" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default HomeModule;
