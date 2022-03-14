import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Input from "../InputField";

import { TInputEvent } from "../../Type/TypeTypes";
import { TypeContext } from "../../Type/Type";

const mockedFn = jest.fn((e: TInputEvent) => undefined);

const setup = (Component: React.ReactElement) => {
  return {
    ...render(
      <TypeContext.Provider
        value={{
          words: "",
          pastColor: [""],
          userIn: "",
          onInput: mockedFn,
          time: 1,
        }}
      >
        {Component}
      </TypeContext.Provider>
    ),
    inputEl: screen.getByTestId("main-input"),
  };
};

describe("InputField Component", () => {
  test("Test the input field renders to the dom", () => {
    const { inputEl } = setup(<Input />);
    expect(inputEl).toBeTruthy();
  });

  test("Test that the input field is empty when initially rendered", () => {
    const { inputEl } = setup(<Input />);
    expect(inputEl).toHaveValue("");
  });

  test("Test the user sees what he/she is typing", () => {
    const { inputEl } = setup(<Input />);
    userEvent.type(inputEl, "p");
    expect(mockedFn).toHaveBeenCalledTimes(2); // Because of the two Events : keyDown and Change
  });

  test("Test that the input field once rendered has immediate focus", () => {
    const { inputEl } = setup(<Input />);
    expect(inputEl).toHaveFocus;
  });
});
