import { render, screen } from "@testing-library/react";
import { Banner } from "./Banner";
import userEvent from "@testing-library/user-event";

describe("Banner", () => {

  it("renders children", () => {
    render(
        <Banner>Account updated successfully.</Banner>
    );

    expect(
      screen.getByRole("status")
    ).toHaveTextContent("Account updated successfully.");
  });

  it("uses info variant by default", () => {
    const { container } = render(
      <Banner>
        This is info banner
      </Banner>
    );
    expect(container.firstChild).toHaveClass("banner banner--info");
  });

  it.each(["info", "error", "warning", "success"] as const)(
    "applies %s variant", (variant) => {
      const { container } = render(
        <Banner variant={variant}>
          Message
        </Banner>
      );
      expect(container.firstChild).toHaveClass(
        "banner",
        `banner--${variant}`,
      );
    }
  );

  it("applies custom className", () => {
    const { container } = render(
      <Banner className="custom-banner">
        Message
      </Banner>,
    );

    expect(container.firstChild).toHaveClass(
      "banner",
      "custom-banner",
    );
  });

  it("forwards HTML attributes", () => {
    render(
      <Banner data-testid="account-banner" id="banner-1">
        Message
      </Banner>,
    );

    const banner = screen.getByTestId("account-banner");

    expect(banner).toHaveAttribute("id", "banner-1");
  });

  it("does not render a dismiss button by default", () => {
    render(
      <Banner>Banner without close button</Banner>
    );
    expect(screen.queryByRole("button", 
      { name: "Dismiss banner"})
    ).not.toBeInTheDocument();
  });


  it("renders a dismiss button when onDismiss is provided", () => {
    render(
      <Banner onDismiss={jest.fn()}>
        Message
      </Banner>,
    );

    expect(
      screen.getByRole("button", {
        name: "Dismiss banner",
      }),
    ).toBeInTheDocument();
  });

  it("calls onDismiss when the dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = jest.fn();

    render(
      <Banner onDismiss={onDismiss}>
        Message
      </Banner>,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Dismiss banner",
      }),
    );

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("uses a custom dismiss label", () => {
    render(
      <Banner dismissLabel="Dismiss notification" onDismiss={jest.fn()}>
        Message
      </Banner>,
    );

    expect(
      screen.getByRole("button", {
        name: "Dismiss notification",
      }),
    ).toBeInTheDocument();
  });

  it("renders the dismiss icon", () => {
    const { container } = render(
      <Banner onDismiss={jest.fn()}>Message</Banner>,
    );

    expect(container.querySelector(".banner-dismiss svg")).toBeInTheDocument();
  });

  it("does not render an inert dismiss button when onDismiss is missing", () => {
    render(
      <Banner>
        Message
      </Banner>,
    );

    expect(
      screen.queryByRole("button", {
        name: "Dismiss banner",
      }),
    ).not.toBeInTheDocument();
  });

})
