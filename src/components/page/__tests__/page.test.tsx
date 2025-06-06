import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { FormFieldProps } from "../../form-field/form-field.model";
import { Page } from "../page";

const fields: FormFieldProps[] = [
  {
    id: "name",
    isRequired: true,
    label: "name",
    name: "name",
    type: "text",
  },
  {
    id: "email",
    isRequired: true,
    label: `email`,
    name: "email",
    type: "email",
  },
];

describe("Page", () => {
  it("should render the page", () => {
    const { getByText } = render(
      <Page fields={fields} id="2" state="NOT_VALIDATED" title="Introduction" />
    );

    expect(getByText("Introduction")).toBeInTheDocument();
  });

  it("should render the fields", () => {
    const { getByLabelText } = render(
      <Page fields={fields} id="2" state="NOT_VALIDATED" title="Introduction" />
    );

    expect(getByLabelText("name")).toBeInTheDocument();
    expect(getByLabelText("email")).toBeInTheDocument();
  });

  it("should call onChange with success", async () => {
    const onChange = vi.fn();
    const { container } = render(
      <Page
        fields={fields}
        id="2"
        onChange={onChange}
        state="NOT_VALIDATED"
        title="Introduction"
      />
    );

    const inputs = container.querySelectorAll("input");

    expect(inputs.length).toBe(2);

    fireEvent.change(inputs[0], {
      target: { value: "test" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "prabhu@gmail.com" },
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith("2", true);
    });
  });

  it("should call onChange with Failure", async () => {
    const onChange = vi.fn();
    const { container } = render(
      <Page
        fields={fields}
        id="2"
        onChange={onChange}
        state="NOT_VALIDATED"
        title="Introduction"
      />
    );

    const inputs = container.querySelectorAll("input");

    expect(inputs.length).toBe(2);

    fireEvent.change(inputs[0], {
      target: { value: "test" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "prabhu" },
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith("2", false);
    });
  });
});
