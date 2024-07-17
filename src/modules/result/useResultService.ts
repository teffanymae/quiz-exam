import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateApp } from "../../store/app.slice";

const bgSound = new Audio("src/assets/audio/bg-sound.mp3");

export const useResultService = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { total, totalCorrect } = useSelector((state: any) => state.app);

  const toHomePage = () => {
    dispatch(updateApp({ totalCorrect: 0 }));
    bgSound.play();
    navigate("/");
  };

  return { toHomePage, total, totalCorrect };
};
