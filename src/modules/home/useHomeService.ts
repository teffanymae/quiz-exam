import { useNavigate } from "react-router-dom";
import {
  appInitialState,
  updateApp,
  useGetQuizListMutation,
} from "../../store/app.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useHomeService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reqGetQuizList, resGetQuizList] = useGetQuizListMutation();

  const toQuizPage = () => {
    dispatch(updateApp(appInitialState));
    reqGetQuizList({});
  };

  useEffect(() => {
    if (resGetQuizList.isSuccess) {
      navigate("/quiz");
    }
  }, [resGetQuizList.isSuccess]);

  return { toQuizPage };
};
