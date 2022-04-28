import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { FormField } from "../form-field";
import styles from "../form-field.module.scss";

describe.concurrent("FormField", () => {
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

  it("should render file", () => {
    const { getByText } = render(
      <FormField id="123" name="file" label="file" type="file" />
    );

    expect(getByText("file")).toBeInTheDocument();
  });

  it("should render select", () => {
    const { container } = render(
      <FormField
        id="234"
        label="select options"
        type="select"
        name="select"
        options={[
          { name: "one", value: "one" },
          {
            name: "two",
            value: "two",
          },
        ]}
      />
    );

    expect(container.querySelector("select")).toBeInTheDocument();
    expect(container.querySelectorAll("option")).toHaveLength(2);
  });

  it("should render text area", () => {
    const { getByText } = render(
      <FormField id="123" name="text" label="text" type="textarea" />
    );

    expect(getByText("text")).toBeInTheDocument();
  })

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

  it("should render asterisk icon for required field", () => {
    const { getByLabelText } = render(
      <FormField type="text" label="field 12" isRequired name="field 12" />
    );

    expect(getByLabelText("important field")).toBeInTheDocument();
    expect(getByLabelText("important field")).toHaveAttribute("role", "img");
  });

  it("should call onChange", async () => {
    const onChange = vi.fn();
    const { container } = render(
      <FormField
        id="123"
        name="field"
        label="field"
        type="text"
        onInput={onChange}
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
