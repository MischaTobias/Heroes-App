import { test, expect, describe } from "vitest";
import { types } from "../../../src/auth";

describe("types.js tests", () => {
  test("should return default types", () => {
    expect(types).toEqual({ login: "[AUTH] Login", logout: "[AUTH] Logout" });
  });
});
