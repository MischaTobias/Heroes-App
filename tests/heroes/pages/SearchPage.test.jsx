import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vitest } from "vitest";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";
import { MemoryRouter, useNavigate } from "react-router-dom";

vitest.mock("react-router-dom", async () => ({
  ...(await vitest.importActual("react-router-dom")),
  useNavigate: vitest.fn(),
}));

describe("<SearchPage /> tests", () => {
  beforeEach(() => {
    cleanup();
    vitest.clearAllMocks();
  });

  test("should show default values correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test("should show Batman and searchbox input with queryString value", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");

    const img = screen.getByRole("img");
    expect(img.src).toContain("batman");

    const noHeroFoundDiv = screen.getByLabelText("not-found");
    expect(noHeroFoundDiv.style.display).toBe("none");
  });

  test("should show an error if hero (batman123) is not found", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const noHeroFoundDiv = screen.getByLabelText("not-found");
    expect(noHeroFoundDiv.style.display).toBe("");
  });

  test("should navigate to new screen", () => {
    const navigateMock = vitest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const searchBoxInput = screen.getByRole("textbox");
    fireEvent.change(searchBoxInput, {
      target: { name: "searchText", value: "batman" },
    });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(navigateMock).toHaveBeenCalledWith("?q=batman");
  });
});
