import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { FormField } from "../form-field";

describe("FormField", () => {
  it.concurrent("should render text box", () => {
    const { getByText } = render(
      <FormField id="123" name="first name" label="first name" />
    );

    expect(getByText("first name")).toBeInTheDocument();
  });
});
