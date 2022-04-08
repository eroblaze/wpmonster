import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import Type from "../../src/Components/Type/Type";
/**
 * userEvent ^14.0.0-beta is unstable and some things which are working in ^13.5.0 are misbehaving there
 */
/** IMPORTANT: React-Testing-Library and Cypress doesn't allow me to simulate the user holding the shift key and pressing backspace inorder to delete
 * a whole word. This means that I can't test that functionality
 *
 * {They don't allow combining modifiers - Ctrl, Shift, e.t.c } but the event they fire will be sent to your code. e.g:
 * userEvent.type(inputEl, "{shift}a{/shift}") will send a through the event object and also that the 'shiftKey: true' but 'a' won't be capitalized
 */
const green = "#10f318";
const red = "rgb(226, 5, 5)";

const words = "this is the typing test";

const setup = (component: React.ReactElement) => {
  return {
    ...render(component),
    inputEl: screen.getByTestId("main-input"),
  };
};

describe("Type main Component", () => {
  // There is no need to test if this component is rendered because this is the main
  // component which encompasses the other two and since I've already checked for the
  // existence of the other two, there is no need to check for this.

  test("Test when component initially renders, all the text are black", () => {
    setup(<Type passedWords={words} />);
    const firstSpan = screen.getByTestId("div0");
    const secondSpan = screen.getByTestId("div1");
    expect(firstSpan).toHaveStyle("color: ''");
    expect(secondSpan).toHaveStyle("color: ''");
  });

  test("Test that as the user types, the GREEN color shows in the Div if he/she is correct", () => {
    const { inputEl } = setup(<Type passedWords={words} />);

    const firstSpan = screen.getByTestId("div0");

    expect(firstSpan).toHaveStyle("color: ''");

    userEvent.type(inputEl, "t");

    const firstSpanAgain = screen.getByTestId("div0");

    expect(firstSpanAgain).toHaveStyle(`color: ${green}`);
    userEvent.type(inputEl, "{selectall}{backspace}"); // a work-around for Ctrl + backspace
  });

  test("Test that as the user types, the RED color shows in the Div background if he/she is wrong", () => {
    const { inputEl } = setup(<Type passedWords={words} />);

    const firstSpan = screen.getByTestId("div0");
    expect(firstSpan).toHaveStyle("background-color: ''");

    userEvent.type(inputEl, "s");

    const firstSpanAgain = screen.getByTestId("div0");
    expect(firstSpanAgain).toHaveStyle(`background-color: ${red}`);
    userEvent.type(inputEl, "{selectall}{backspace}"); // a work-around for Ctrl + backspace
  });

  test("Test that any additional character after the initial word rendered gets appended into the div", () => {
    const { inputEl } = setup(<Type passedWords={words} />);

    expect(screen.getAllByTestId(/^div\d+$/)).toHaveLength(23); // Starts at 0

    userEvent.type(inputEl, "thiswr");

    const firstExtraLetter = screen.getByTestId("div4");
    expect(firstExtraLetter).toHaveTextContent("w");
    expect(screen.getByTestId("div5")).toHaveTextContent("r");
    expect(firstExtraLetter).toHaveStyle(`background-color: ${red}`);
    expect(screen.getAllByTestId(/^div\d+$/)).toHaveLength(25);

    userEvent.type(inputEl, "{selectall}{backspace}"); // a work-around for Ctrl + backspace
  });

  test("Test that if the user presses ctrl + any key, nothing happens in the display", () => {
    // This test isn't even working because of 'userEvent' yet again
    const { inputEl } = setup(<Type passedWords={words} />);

    expect(inputEl).toHaveValue("");

    userEvent.type(inputEl, "p{ctrl}z{/ctrl}"); // This normally is supposed to clear the undo p

    expect(inputEl).toHaveValue("p"); // Then this would fail

    userEvent.type(inputEl, "{ctrl}y{/ctrl}"); // This should bring p back

    expect(inputEl).toHaveValue("p");

    userEvent.type(inputEl, "{selectall}{backspace}");
  });

  test.todo(
    "Test that when the time is up, the form automatically gets submitted"
  );
  test.todo(
    "Test that when the form gets submitted, there is a loading state being displayed in the screen"
  );
  test.todo(
    "Test that there is no words on the screen just like it is in 10fastfingers"
  );

  // For now, this test should be the last one
  test("Test that when the user initially presses a space, the whole first word turns red", () => {
    const { inputEl } = setup(<Type passedWords={words} />);

    userEvent.type(inputEl, "{space}");

    const firstSpan = screen.getByTestId("div0");
    const secondSpan = screen.getByTestId("div1");
    const thirdSpan = screen.getByTestId("div2");
    const fourthSpan = screen.getByTestId("div3");

    expect(firstSpan).toHaveStyle(`background-color: ${red}`);
    expect(secondSpan).toHaveStyle(`background-color: ${red}`);
    expect(thirdSpan).toHaveStyle(`background-color: ${red}`);
    expect(fourthSpan).toHaveStyle(`background-color: ${red}`);
  });

  /*

  Can't test this because of react-testing-library 

  test.todo(
    "Test that holding ctrl and pressing the backspace key causes everything on the input to clear and then clears that in the display"
  );
  test.todo(
    "Test that if there are full punctuations, the display stops right where it should when you press Ctrl + backspace"
  );

  */
});
