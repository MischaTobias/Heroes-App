import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test } from "vitest";
import { AppRouter } from "../../src/router/AppRouter";
import { AuthContext } from "../../src/auth";

describe("<AppRouter /> tests", () => {
  beforeEach(() => {
    cleanup();
  });

  test("should show login if not authenticated", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText("Login").length).toBeGreaterThan(0);
  });

  test("should show marvel component if authenticated", () => {
    const contextValue = {
      logged: true,
      user: {
        id: "123",
        name: "Suguru Geto",
      },
    };

    const marvelComponentTitle = "Marvel Comics";

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(marvelComponentTitle)).toBeTruthy();
  });
});
