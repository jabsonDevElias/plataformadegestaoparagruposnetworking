import { render, screen, fireEvent } from "@testing-library/react";
import DashboardLayout from "./layout";
import { useAuth } from "@/src/hooks/useAuth";

jest.mock("@headlessui/react", () => ({
  Disclosure: ({ children }: any) => <nav>{children}</nav>,
  DisclosureButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  DisclosurePanel: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("next/link", () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

jest.mock("@/src/hooks/useAuth");

const mockPush = jest.fn();
const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
  usePathname: () => "/dashboard",
}));

describe("DashboardLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function mockAuth(authenticated: boolean, loading = false) {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: authenticated,
      isLoading: loading,
    });
  }

  const Child = () => <div>child-content</div>;

  it("renderiza o título", () => {
    mockAuth(true);

    render(
      <DashboardLayout>
        <Child />
      </DashboardLayout>
    );

    expect(screen.getByText("Seja Bem-Vindo")).toBeInTheDocument();
  });

  it("renderiza o children", () => {
    mockAuth(true);

    render(
      <DashboardLayout>
        <Child />
      </DashboardLayout>
    );

    expect(screen.getByText("child-content")).toBeInTheDocument();
  });

  it("redireciona para login se não autenticado", () => {
    mockAuth(false, false);

    render(
      <DashboardLayout>
        <Child />
      </DashboardLayout>
    );

    expect(mockReplace).toHaveBeenCalledWith("/login");
  });

  it("não redireciona enquanto isLoading", () => {
    mockAuth(false, true);

    render(
      <DashboardLayout>
        <Child />
      </DashboardLayout>
    );

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("logout remove token e redireciona", () => {
    mockAuth(true);

    Storage.prototype.removeItem = jest.fn();

    render(
      <DashboardLayout>
        <Child />
      </DashboardLayout>
    );

    const btn = screen.getAllByRole("button")[0];
    fireEvent.click(btn);

    expect(localStorage.removeItem).toHaveBeenCalledWith("authToken");
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("renderiza links do menu", () => {
    mockAuth(true);

    render(
      <DashboardLayout>
        <Child />
      </DashboardLayout>
    );

    const dashboardLinks = screen.getAllByRole("link", { name: /Dashboard/i });
    expect(dashboardLinks.length).toBeGreaterThan(0);

    const intentionLinks = screen.getAllByRole("link", { name: /Lista de Intenções/i });
    expect(intentionLinks.length).toBeGreaterThan(0);
  });
});
