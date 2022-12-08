import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment/index";

afterEach(cleanup);

/*
  A test that renders a React Component
*/
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("Shows student name when new appointment is added", () => {
    // ...
  });

  it("does something else it is supposed to do", () => {
    // ...
  });
  it("calls the function", () => {
    const fn = jest.fn();
    fn(1)
    expect(fn).toHaveBeenCalledWith(1);
  });
});
