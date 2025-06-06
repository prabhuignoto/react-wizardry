import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { PageModelProps } from "../../page/page.model";
import { WizardHeader } from "../wizard-header";

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

describe("Wizard Header", () => {
  it("should render the header", () => {
    const { getByRole, getAllByRole } = render(
      <WizardHeader activeIndex={0} pages={pages} />
    );

    expect(getByRole("tablist")).toBeInTheDocument();
    expect(getAllByRole("tab")).toHaveLength(3);
  });

  it("should render icon states", () => {
    const { getAllByRole } = render(
      <WizardHeader activeIndex={0} pages={pages} />
    );

    expect(getAllByRole("img")).toHaveLength(3);

    expect(getAllByRole("img")[1]).toHaveAttribute("aria-label", "fail");
  });
});
