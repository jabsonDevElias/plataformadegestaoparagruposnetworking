import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./page";

jest.mock("@headlessui/react", () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogPanel: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("Home Page", () => {
  it("renderiza título principal", () => {
    render(<Page />);
    expect(
      screen.getByText("Bem-vindo à nossa plataforma de networking")
    ).toBeInTheDocument();
  });

  it("renderiza o botão 'Seja Membro'", () => {
    render(<Page />);
    const btn = screen.getByRole("link", { name: /Seja Membro/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("href", "/intention");
  });

  it("renderiza o link de login", () => {
    render(<Page />);

    const links = screen.getAllByRole("link", { name: /Log in/i });

    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", "/login");
  });
});
