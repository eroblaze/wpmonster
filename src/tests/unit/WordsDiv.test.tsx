import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Div from "../../Components/Div/WordsDiv";

import { TypeContext } from "../../Components/Type/Type";
import { TInputEvent } from "../../types/TypeTypes";

const words = "what is the meaning of this?";
const pastColor = ["red", "green", "blue"];

const mockedFn = jest.fn((e: TInputEvent) => undefined);

const setup = (Component: React.ReactElement) => {
  return {
    ...render(
      <TypeContext.Provider
        value={{
          derivedWrongWords: [""],
          words,
          pastColor,
          userIn: "",
          onInput: mockedFn,
        }}
      >
        {Component}
      </TypeContext.Provider>
    ),
  };
};

describe("WordsDiv Component", () => {
  test("Test the WordsDiv component renders", () => {
    setup(<Div spaceCount={0} />);
    const divEl = screen.getByTestId("words-div");
    expect(divEl).toBeInTheDocument();
  });

  test("Test that it displays the words array to the screen", () => {
    setup(<Div spaceCount={0} />);
    const divEl = screen.getByText("w");
    expect(divEl).toBeInTheDocument();
  });

  test("Test that the colors of the characters can change", () => {
    setup(<Div spaceCount={0} />);
    const divEl = screen.getByText("w");
    expect(divEl).toHaveStyle("color: red");
  });
});
