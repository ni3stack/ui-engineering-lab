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

  it("does not render close button by default", () => {
    render(
      <Banner>Banner without close button</Banner>
    );
    expect(screen.queryByRole("button", 
      { name: "Close banner"})
    ).not.toBeInTheDocument();
  });


  it("renders close button when dismissible", () => {
    render(
      <Banner dismissible onClose={jest.fn()}>
        Message
      </Banner>,
    );

    expect(
      screen.getByRole("button", {
        name: "Close banner",
      }),
    ).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Banner dismissible onClose={onClose}>
        Message
      </Banner>,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Close banner",
      }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render close button when dismissible is false", () => {
    render(
      <Banner dismissible={false} onClose={jest.fn()}>
        Message
      </Banner>,
    );

    expect(
      screen.queryByRole("button", {
        name: "Close banner",
      }),
    ).not.toBeInTheDocument();
  });

  it("does not render an inert close button when onClose is missing", () => {
    render(
      <Banner dismissible>
        Message
      </Banner>,
    );

    expect(
      screen.queryByRole("button", {
        name: "Close banner",
      }),
    ).not.toBeInTheDocument();
  });

})

