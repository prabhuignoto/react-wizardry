import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { FormField } from "../form-field";
import styles from "../form-field.module.scss";

describe("FormField", () => {
  it("should render text box", () => {
    const { getByText } = render(
      <FormField id="123" name="date" label="first name" />
    );

    expect(getByText("first name")).toBeInTheDocument();
  });

  it("should render checkbox", () => {
    const { getByText } = render(
      <FormField id="123" name="option" label="option" type="checkbox" />
    );

    expect(getByText("option")).toBeInTheDocument();
  });

  it("should render datetime", () => {
    const { getByText } = render(
      <FormField id="123" name="date" label="date" type="datetime" />
    );

    expect(getByText("date")).toBeInTheDocument();
  });

  it("should render valid icon", () => {
    const { getByLabelText } = render(
      <FormField id="123" name="field" label="field" type="datetime" isValid />
    );

    expect(getByLabelText("success")).toBeInTheDocument();

    expect(getByLabelText("success")).toHaveAttribute("aria-label", "success");
  });

  it("should render invalid icon", () => {
    const { getByLabelText } = render(
      <FormField
        id="123"
        name="field"
        label="field"
        type="datetime"
        isValid={false}
      />
    );

    expect(getByLabelText("fail")).toBeInTheDocument();

    expect(getByLabelText("fail")).toHaveAttribute("aria-label", "fail");
  });

  it("should render the label", () => {
    const { getByLabelText } = render(
      <FormField id="123" name="field" label="field 123" type="text" />
    );

    expect(getByLabelText("field 123")).toBeInTheDocument();
  });

  it("should have the valid class", () => {
    const { container } = render(
      <FormField id="123" name="field" label="field" type="text" isValid />
    );

    expect(container.firstChild).toHaveClass(
      styles.form_field,
      styles.is_valid
    );
  });
});
