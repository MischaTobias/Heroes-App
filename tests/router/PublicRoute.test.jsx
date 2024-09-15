import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("<PublicRoute /> tests", () => {
  beforeEach(() => {
    cleanup();
  });

  test("should show children if not authenticated", () => {
    const contextValue = { logged: false };
    const childComponentText = "Public route";

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>{childComponentText}</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText(childComponentText)).toBeTruthy();
  });

  test("should navigate if authenticated", () => {
    const contextValue = {
      logged: true,
      user: { id: "123", name: "Suguru Geto" },
    };
    const publicRouteComponentText = "Public route";
    const privateRouteComponentText = "Marvel Page";

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>{publicRouteComponentText}</h1>
                </PublicRoute>
              }
            />
            <Route
              path="marvel"
              element={<h1>{privateRouteComponentText}</h1>}
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(privateRouteComponentText)).toBeTruthy();
  });
});
