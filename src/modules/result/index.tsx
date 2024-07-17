import { useEffect } from "react";
import { useResultService } from "./useResultService";
import gsap from "gsap";

const winningSound = new Audio("src/assets/audio/winning.mp3");
const tryAgainSound = new Audio("src/assets/audio/try-again.mp3");

function ResultModule() {
  const { toHomePage, total, totalCorrect } = useResultService();

  useEffect(() => {
    if (totalCorrect > 4) {
      winningSound.play();
    } else {
      tryAgainSound.play();
    }

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

    gsap.fromTo(
      ".message",
      { scale: 2, y: 500, ease: "power2.inOut" },
      { scale: 1, y: 0, duration: 2, ease: "back" }
    );

    gsap.fromTo(
      ".whiteBg",
      { y: -1100, delay: 4, display: "none", duration: 4, direction: "down" },
      {
        y: 0,
        delay: 2,
        stagger: 1,
        display: "flex",
        duration: 2,
        ease: "back",
      }
    );

    gsap.fromTo(
      ".playAgain",
      { opacity: 0 },
      { delay: 4, stagger: 0.25, opacity: 1, duration: 2 }
    );

    gsap.to(".playAgain", {
      x: 20,
      direction: "right",
      duration: 1,
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-backgroundDesktop bg-image h-full w-full" />
      <div className="bg-warm-blue h-screen flex gap-20 justify-center items-center px-10 text-harp-whit">
        <div className="text-harp-white">
          <div className="message">
            <p className="font-bebas text-[200px] leading-[100px] uppercase">
              {totalCorrect > 4 ? "Bravo!" : "It's okay,"}
            </p>
            <p className="font-bebas text-[80px] leading-[150px] uppercase">
              {totalCorrect > 4 ? "You have Scored" : "Better luck next time"}
            </p>
          </div>
          <div className="playAgain">
            <button
              className="font-sora text-[26px] underline float-right"
              onClick={toHomePage}
            >
              Wanna Play Again?
            </button>
          </div>
        </div>
        <div className="whiteBg flex items-center bg-harp-white h-screen">
          <p className="total font-bebas text-[280px] text-warm-blue leading-[200px] mx-auto px-10">
            {totalCorrect}/{total}
          </p>
        </div>
      </div>
    </>
  );
}

export default ResultModule;
