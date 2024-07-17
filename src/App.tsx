import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/home";
import QuizPage from "./pages/quiz";
import ResultPage from "./pages/result";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { updateApp } from "./store/app.slice";

function App() {
  const dispatch = useDispatch();

  const { app } = useSelector((state: any) => state);

  const appData: string | null = localStorage.getItem("app");
  const initApp = appData == null ? app : JSON.parse(appData);

  useEffect(() => {
    dispatch(updateApp(initApp));
  }, []);

  return (
    <React.Suspense>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/quiz"} element={<QuizPage />} />
        <Route path={"/result"} element={<ResultPage />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
