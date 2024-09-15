import { Route, Routes } from "react-router-dom";

import { HeroesRoutes } from "../heroes";
import { LoginPage } from "../auth";

export const AppRouter = () => {
  return (
    <>
      <Routes basename="/HeroesSPA">
        <Route path="login" element={<LoginPage />}></Route>

        <Route path="/*" element={<HeroesRoutes />}></Route>
      </Routes>
    </>
  );
};
