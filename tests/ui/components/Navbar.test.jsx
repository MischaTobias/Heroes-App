import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vitest } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";

import { Navbar } from "../../../src/ui";
import { AuthContext } from "../../../src/auth";

vitest.mock("react-router-dom", async () => ({
  ...(await vitest.importActual("react-router-dom")),
  useNavigate: vitest.fn(),
}));

describe("<Navbar /> tests", () => {
  beforeEach(() => {
    cleanup();
    vitest.clearAllMocks();
  });

  test("should show user name", () => {
    const contextValue = {
      logged: true,
      user: {
        id: "123",
        name: "Suguru Geto",
      },
    };

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(contextValue.user.name)).toBeTruthy();
  });

  test("should call logout and navigate when clicking in Logout", () => {
    const contextValue = {
      logged: true,
      user: {
        id: "123",
        name: "Suguru Geto",
      },
      logout: vitest.fn(),
    };

    const navigateMock = vitest.fn();

    useNavigate.mockReturnValueOnce(navigateMock);

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole("button");
    fireEvent.click(logoutButton);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("/login", { replace: true });
  });
});
