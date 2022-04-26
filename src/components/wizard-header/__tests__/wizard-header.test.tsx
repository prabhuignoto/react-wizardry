import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { PageModelProps } from "../../page/page.model";
import { WizardHeader } from "../wizard-header";

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

describe.concurrent("Wizard Header", () => {
  it("should render the header", () => {
    const { getByRole, getAllByRole } = render(
      <WizardHeader pages={pages} activeIndex={0} />
    );

    expect(getByRole("tablist")).toBeInTheDocument();
    expect(getAllByRole("tab")).toHaveLength(3);
  });

  it("should render icon states", () => {
    const { getAllByRole } = render(
      <WizardHeader pages={pages} activeIndex={0} />
    );

    expect(getAllByRole("img")).toHaveLength(3);

    expect(getAllByRole("img")[1]).toHaveAttribute("aria-label", "fail");
  });
});
