import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page";

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

const mockMutate = jest.fn();
jest.mock("@/src/hooks/login/useLogin", () => ({
  useSignIn: () => ({
    mutate: mockMutate,
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  }),
}));

let mockAuthData = {
  isAuthenticated: false,
  isLoading: false,
};

jest.mock("@/src/hooks/useAuth", () => ({
  useAuth: () => mockAuthData,
}));

const mockHandleChange = jest.fn();
const mockSetForm = jest.fn();

jest.mock("@/src/hooks/useForm", () => ({
  useForm: () => ({
    form: { email: "", password: "" },
    handleChange: mockHandleChange,
    setForm: mockSetForm,
  }),
}));

describe("Login Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthData = { isAuthenticated: false, isLoading: false };
  });

  it("renderiza título", () => {
    render(<Page />);
    expect(
      screen.getByText("Área do Administrador")
    ).toBeInTheDocument();
  });

  it("chama mutate ao enviar formulário", () => {
    render(<Page />);

    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);

    expect(mockMutate).toHaveBeenCalled();
  });

  it("redireciona se autenticado", () => {
    mockAuthData = { isAuthenticated: true, isLoading: false };
    render(<Page />);

    expect(mockReplace).toHaveBeenCalledWith("/dashboard");
  });

  it("mostra Loading quando isLoading=true", () => {
    mockAuthData = { isAuthenticated: false, isLoading: true };
    render(<Page />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
