import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders its children as a polite status by default", () => {
    render(<Alert>Profile updated successfully.</Alert>);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Profile updated successfully.",
    );
  });

  it.each(["info", "success", "warning", "error"] as const)(
    "applies the %s variant",
    (variant) => {
      const { container } = render(<Alert variant={variant}>Message</Alert>);

      expect(container.firstChild).toHaveClass("alert", `alert--${variant}`);
    },
  );

  it("applies a custom className and forwards HTML attributes", () => {
    render(
      <Alert className="account-alert" data-testid="account-alert" id="alert-1">
        Message
      </Alert>,
    );

    const alert = screen.getByTestId("account-alert");

    expect(alert).toHaveClass("alert", "account-alert");
    expect(alert).toHaveAttribute("id", "alert-1");
  });

  it("uses an assertive alert role when requested", () => {
    render(<Alert assertive>Unable to save changes.</Alert>);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("allows a supplied role to override the default role", () => {
    render(<Alert role="log">Message</Alert>);

    expect(screen.getByRole("log")).toBeInTheDocument();
  });

  it("renders a heading when provided", () => {
    render(<Alert heading="Save failed">Unable to save changes.</Alert>);

    expect(screen.getByText("Save failed")).toHaveClass("alert__heading");
  });

  it("renders the default icon for its variant", () => {
    const { container } = render(<Alert variant="warning">Message</Alert>);

    expect(container.querySelector(".alert__icon svg")).toBeInTheDocument();
  });

  it("renders a custom icon", () => {
    render(
      <Alert icon={<span data-testid="custom-icon">!</span>}>Message</Alert>,
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("does not render an icon when icon is null", () => {
    const { container } = render(<Alert icon={null}>Message</Alert>);

    expect(container.querySelector(".alert__icon")).not.toBeInTheDocument();
  });

  it("does not render a dismiss button by default", () => {
    render(<Alert>Message</Alert>);

    expect(
      screen.queryByRole("button", { name: "Dismiss alert" }),
    ).not.toBeInTheDocument();
  });

  it("renders a dismiss button and calls onDismiss", async () => {
    const user = userEvent.setup();
    const onDismiss = jest.fn();

    render(<Alert onDismiss={onDismiss}>Message</Alert>);

    await user.click(screen.getByRole("button", { name: "Dismiss alert" }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("uses a custom dismiss label", () => {
    render(
      <Alert dismissLabel="Dismiss notification" onDismiss={jest.fn()}>
        Message
      </Alert>,
    );

    expect(
      screen.getByRole("button", { name: "Dismiss notification" }),
    ).toBeInTheDocument();
  });
});
