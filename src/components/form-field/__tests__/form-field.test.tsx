import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { FormField } from "../form-field";
import styles from "../form-field.module.scss";

describe("FormField", () => {
  it("should render text box", () => {
    const { getByText } = render(
      <FormField id="123" label="first name" name="date" />
    );

    expect(getByText("first name")).toBeInTheDocument();
  });

  it("should render checkbox", () => {
    const { getByText } = render(
      <FormField id="123" label="option" name="option" type="checkbox" />
    );

    expect(getByText("option")).toBeInTheDocument();
  });

  it("should render datetime", () => {
    const { getByText } = render(
      <FormField id="123" label="date" name="date" type="datetime" />
    );

    expect(getByText("date")).toBeInTheDocument();
  });

  it("should render file", () => {
    const { getByText } = render(
      <FormField id="123" label="file" name="file" type="file" />
    );

    expect(getByText("file")).toBeInTheDocument();
  });

  it("should render select", () => {
    const { container } = render(
      <FormField
        id="234"
        label="select options"
        name="select"
        options={[
          { name: "one", value: "one" },
          {
            name: "two",
            value: "two",
          },
        ]}
        type="select"
      />
    );

    expect(container.querySelector("select")).toBeInTheDocument();
    expect(container.querySelectorAll("option")).toHaveLength(3);
  });

  it("should render text area", () => {
    const { getByText } = render(
      <FormField id="123" label="text" name="text" type="textarea" />
    );

    expect(getByText("text")).toBeInTheDocument();
  })

  it("should render valid icon", () => {
    const { getByLabelText } = render(
      <FormField id="123" isValid label="field" name="field" type="datetime" />
    );

    expect(getByLabelText("success")).toBeInTheDocument();

    expect(getByLabelText("success")).toHaveAttribute("aria-label", "success");
  });

  it("should render invalid icon", () => {
    const { getByLabelText } = render(
      <FormField
        id="123"
        isValid={false}
        label="field"
        name="field"
        type="datetime"
      />
    );

    expect(getByLabelText("fail")).toBeInTheDocument();

    expect(getByLabelText("fail")).toHaveAttribute("aria-label", "fail");
  });

  it("should render the label", () => {
    const { getByLabelText } = render(
      <FormField id="123" label="field 123" name="field" type="text" />
    );

    expect(getByLabelText("field 123")).toBeInTheDocument();
  });

  it("should have the valid class", () => {
    const { container } = render(
      <FormField id="123" isValid label="field" name="field" type="text" />
    );

    expect(container.firstChild).toHaveClass(
      styles.form_field,
      styles.is_valid
    );
  });

  it("should render asterisk icon for required field", () => {
    const { getByLabelText } = render(
      <FormField isRequired label="field 12" name="field 12" type="text" />
    );

    expect(getByLabelText("important field")).toBeInTheDocument();
    expect(getByLabelText("important field")).toHaveAttribute("role", "img");
  });

  it("should call onChange", async () => {
    const onChange = vi.fn();
    const { container } = render(
      <FormField
        id="123"
        label="field"
        name="field"
        onInput={onChange}
        type="text"
      />
    );

    expect(container.querySelector("input[type='text']")).toBeInTheDocument();

    fireEvent.change(
      container.querySelector("input[type='text']") as HTMLInputElement,
      {
        target: { value: "test" },
      }
    );

    await waitFor(() => {
      expect(onChange).toBeCalled();
    });
  });
});
