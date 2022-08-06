import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PageModelProps } from "../../page/page.model";
import { WizardFooter } from "../wizard-footer";
import styles from "../wizard-footer.module.scss";

const pages: PageModelProps[] = [
  {
    fields: [],
    id: "page1",
    state: "NOT_VALIDATED",
    title: "Page 1",
  },
  {
    fields: [],
    id: "page2",
    state: "FAIL",
    title: "Page 2",
  },
  {
    fields: [],
    id: "page3",
    state: "NOT_VALIDATED",
    title: "Page 3",
  },
];

describe.concurrent("WizardFooter", () => {
  it("should render", () => {
    const { container } = render(<WizardFooter pages={pages} />);

    expect(container.firstChild).toHaveClass(styles.wizard_footer);
  });

  it("should render buttons", () => {
    const { getAllByRole } = render(
      <WizardFooter activeId={"page2"} pages={pages} />
    );

    expect(getAllByRole("button")[0]).toHaveAttribute("aria-label", "go back");
    expect(getAllByRole("button")[1]).toHaveAttribute(
      "aria-label",
      "go forward"
    );
  });

  it("should render finish button", () => {
    const { getAllByRole } = render(
      <WizardFooter activeId={"page3"} pages={pages} />
    );

    expect(getAllByRole("button")[1]).toHaveAttribute("aria-label", "finish");
  });

  it("should call onNext", () => {
    const handler = vi.fn();

    const { getByRole } = render(
      <WizardFooter onNext={handler} pages={pages} />
    );

    fireEvent.click(getByRole("button", { name: "go forward" }));

    expect(handler).toBeCalled();
  });

  it("should call back", () => {
    const handler = vi.fn();

    const { getByRole } = render(
      <WizardFooter onPrev={handler} pages={pages} />
    );

    fireEvent.click(getByRole("button", { name: "go back" }));

    expect(handler).toBeCalled();
  });

  it("should render alert message", () => {
    const { getByRole } = render(
      <WizardFooter
        activeId={"page2"}
        message="Please correct errors in the form."
        pages={pages}
      />
    );

    expect(getByRole("alert")).toHaveTextContent(
      "Please correct errors in the form."
    );
  });
});
