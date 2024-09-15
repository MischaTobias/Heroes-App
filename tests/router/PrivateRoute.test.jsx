import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vitest } from "vitest";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("<PrivateRoute /> tests", () => {
  beforeEach(() => {
    cleanup();
  });

  test("should show children if authenticated", () => {
    Storage.prototype.setItem = vitest.fn();

    const contextValue = {
      logged: true,
      user: { id: "123", name: "Suguru Geto" },
    };
    const privateRouteComponentText = "Marvel Page";
    const publicRouteComponentText = "Public route";

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <Routes>
            <Route
              path="marvel"
              element={
                <PrivateRoute>
                  <h1>{privateRouteComponentText}</h1>
                </PrivateRoute>
              }
            />
            <Route path="login" element={<h1>{publicRouteComponentText}</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(privateRouteComponentText)).toBeTruthy();
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "lastPath",
      "/marvel"
    );
  });
});
