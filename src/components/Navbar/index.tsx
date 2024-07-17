import { useDispatch, useSelector } from "react-redux";
import { updateApp } from "../../store/app.slice";

const Navbar = () => {
  const dispatch = useDispatch();

  const { app } = useSelector((state: any) => state);
  const { themeMode } = app;

  const handleThemeMode = () => {
    const params = {
      ...app,
      themeMode: themeMode === "light" ? "dark" : "light",
    };
    dispatch(updateApp(params));

    localStorage.setItem("app", JSON.stringify(params));
  };

  const baseBgClasses =
    "h-5 w-8 cursor-pointer rounded-full p-1 sm:h-7 sm:w-12";
  const lightBgClasses = "bg-warm-blue";
  const darkBgClasses = "bg-light-grey";

  const buttonBgClasses = `${baseBgClasses} ${
    themeMode === "dark" ? darkBgClasses : lightBgClasses
  }`;

  const baseClasses =
    "h-3 w-3 rounded-full bg-white transition-all duration-300 ease-in-out sm:h-5 sm:w-5";
  const lightClasses = "mr-auto";
  const darkClasses = "ml-auto";

  const buttonClasses = `${baseClasses} ${
    themeMode === "dark" ? darkClasses : lightClasses
  }`;

  return (
    <nav className="flex fixed top-0 right-0 justify-end px-6 py-10">
      <section className="flex items-center gap-2 sm:gap-3">
        <img
          src={
            themeMode === "dark"
              ? "src/assets/images/icon-sun-light.svg"
              : "src/assets/images/icon-sun-dark.svg"
          }
          alt="Light Mode"
          className="h-4 w-4 sm:h-6 sm:w-6"
        />

        <div className={buttonBgClasses} onClick={handleThemeMode}>
          <div className={buttonClasses} />
        </div>
        <img
          src={
            themeMode === "dark"
              ? "src/assets/images/icon-moon-light.svg"
              : "src/assets/images/icon-moon-dark.svg"
          }
          alt="Dark Mode"
          className="h-4 w-4 sm:h-6 sm:w-6"
        />
      </section>
    </nav>
  );
};

export default Navbar;
