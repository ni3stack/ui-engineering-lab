import { render, screen } from "@testing-library/react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./index";

describe("Card", () => {
  describe("Card", () => {
    it("renders children", () => {
      render(
        <Card>
          <span>Card content</span>
        </Card>
      );

      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("applies className", () => {
      render(
        <Card className="custom-card" data-testid="card">
          Card content
        </Card>
      );

      expect(screen.getByTestId("card"))
        .toHaveClass("card", "custom-card");
    });

    it("forwards HTML attributes", () => {
      render(
        <Card data-testid="card" id="account-card">
          Card content
        </Card>
      );

      const card = screen.getByTestId("card");

      expect(card).toHaveAttribute("id", "account-card");
    });
  });

  describe("CardHeader", () => {
    it("renders children", () => {
      render(
        <CardHeader>
          Header content
        </CardHeader>
      );

      expect(screen.getByText("Header content")).toBeInTheDocument();
    });

    it("applies className", () => {
      render(
        <CardHeader data-testid="card-header"  className="custom-header">
          Header content
        </CardHeader>
      );

      expect(screen.getByTestId("card-header"))
        .toHaveClass("card-header", "custom-header");
    });

    it("forwards HTML attributes", () => {
      render(
        <CardHeader data-testid="header">
          Header content
        </CardHeader>
      );

      expect(screen.getByTestId("header")).toBeInTheDocument();
    });
  });

  describe("CardTitle", () => {
    it("renders as a heading", () => {
      render(<CardTitle>Account Settings</CardTitle>);

      expect(
        screen.getByRole("heading", { name: "Account Settings" })
      ).toBeInTheDocument();
    });

    it("applies className", () => {
        render(
            <CardTitle data-testid="cardtitle" className="custom-title">
                Account Settings
            </CardTitle>
        );

        expect(screen.getByTestId("cardtitle"))
        .toHaveClass("card-title", "custom-title");
    });

    it("forwards HTML attributes", () => {
      render(
        <CardTitle id="account-title">
          Account Settings
        </CardTitle>
      );

      expect(
        screen.getByRole("heading", { name: "Account Settings" })
      ).toHaveAttribute("id", "account-title");
    });
  });

  describe("CardDescription", () => {
    it("renders as a paragraph", () => {
      render(
        <CardDescription>
          Manage your account settings.
        </CardDescription>
      );

      const description = screen.getByText(
        "Manage your account settings."
      );

      expect(description.tagName).toBe("P");
    });

    it("applies className", () => {
      render(
        <CardDescription data-testid="description" className="custom-description">
          Description
        </CardDescription>
      );

      expect(screen.getByTestId("description"))
        .toHaveClass("card-description", "custom-description");
    });

    it("forwards HTML attributes", () => {
      render(
        <CardDescription id="account-description">
          Description
        </CardDescription>
      );

      expect(screen.getByText("Description"))
        .toHaveAttribute("id", "account-description");
    });
  });

  describe("CardContent", () => {
    it("renders children", () => {
      render(
        <CardContent>
          Main content
        </CardContent>
      );

      expect(screen.getByText("Main content")).toBeInTheDocument();
    });

    it("applies className", () => {
        render(
            <CardContent data-testid="card-content" className="custom-content">
            Main content
            </CardContent>
        );

        expect(screen.getByTestId("card-content"))
        .toHaveClass("card-content", "custom-content");
    });

    it("forwards HTML attributes", () => {
      render(
        <CardContent data-testid="content">
          Main content
        </CardContent>
      );

      expect(screen.getByTestId("content")).toBeInTheDocument();
    });
  });

  describe("CardFooter", () => {
    it("renders children", () => {
      render(
        <CardFooter>
          Footer content
        </CardFooter>
      );

      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("applies className", () => {
    render(
        <CardFooter data-testid="card-footer" className="custom-footer">
            Footer content
        </CardFooter>
    );

    expect(screen.getByTestId("card-footer"))
        .toHaveClass("card-footer", "custom-footer");
    });

    it("forwards HTML attributes", () => {
      render(
        <CardFooter data-testid="footer">
          Footer content
        </CardFooter>
      );

      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
  });

  describe("composition", () => {
    it("renders the complete card structure", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account settings.
            </CardDescription>
          </CardHeader>

          <CardContent>
            Account information
          </CardContent>

          <CardFooter>
            Save changes
          </CardFooter>
        </Card>
      );

      expect(
        screen.getByRole("heading", {
          name: "Account Settings",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByText("Manage your account settings.")
      ).toBeInTheDocument();

      expect(
        screen.getByText("Account information")
      ).toBeInTheDocument();

      expect(
        screen.getByText("Save changes")
      ).toBeInTheDocument();
    });
  });
});