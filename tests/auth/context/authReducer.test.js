import { describe, expect, test } from "vitest";
import { authReducer, types } from "../../../src/auth";

describe("authReducer tests", () => {
  test("should return default state when initialized", () => {
    const initialState = { logged: false };
    const state = authReducer(initialState, {});

    expect(state).toBe(initialState);
  });

  test("should (login) call login, authenticate, and set user", () => {
    const initialState = { logged: false };
    const action = {
      type: types.login,
      payload: {
        id: "123",
        name: "Suguru Geto",
      },
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });

  test("should (logout) remove users name and logged should be false", () => {
    const initialState = {
      logged: true,
      user: { id: "123", name: "Suguru Geto" },
    };
    const action = {
      type: types.logout,
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual({
      logged: false,
    });
  });
});
