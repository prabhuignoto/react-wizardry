import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { PageModelProps } from "../../page/page.model";
import { WizardFooter } from "../wizard-footer";
import styles from "../wizard-footer.module.scss";

const pages: PageModelProps[] = [
  {
    id: "page1",
    title: "Page 1",
    state: "NOT_VALIDATED",
    fields: [],
  },
  {
    id: "page2",
    title: "Page 2",
    state: "FAIL",
    fields: [],
  },
  {
    id: "page3",
    title: "Page 3",
    state: "NOT_VALIDATED",
    fields: [],
  },
];

describe.concurrent("WizardFooter", () => {
  it("should render", () => {
    const { container } = render(<WizardFooter pages={pages} />);

    expect(container.firstChild).toHaveClass(styles.wizard_footer);
  });

  it("should render buttons", () => {
    const { getAllByRole } = render(
      <WizardFooter pages={pages} activeId={"page2"} />
    );

    expect(getAllByRole("button")[0]).toHaveAttribute("aria-label", "go back");
    expect(getAllByRole("button")[1]).toHaveAttribute(
      "aria-label",
      "go forward"
    );
  });

  it("should render finish button", () => {
    const { getAllByRole } = render(
      <WizardFooter pages={pages} activeId={"page3"} />
    );

    expect(getAllByRole("button")[1]).toHaveAttribute("aria-label", "finish");
  });

  it("should call onNext", () => {
    const handler = vi.fn();

    const { getByRole } = render(
      <WizardFooter pages={pages} onNext={handler} />
    );

    fireEvent.click(getByRole("button", { name: "go forward" }));

    expect(handler).toBeCalled();
  });

  it("should call back", () => {
    const handler = vi.fn();

    const { getByRole } = render(
      <WizardFooter pages={pages} onPrev={handler} />
    );

    fireEvent.click(getByRole("button", { name: "go back" }));

    expect(handler).toBeCalled();
  });

  it("should render alert message", () => {
    const { getByRole } = render(
      <WizardFooter pages={pages} activeId={"page2"} />
    );

    expect(getByRole("alert")).toHaveTextContent(
      "Form has errors. Please fix it to proceed to the next step."
    );
  });
});
