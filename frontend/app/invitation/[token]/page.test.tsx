/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page";
import { useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useInsertMembers } from "@/src/hooks/members/useInsertMembers";

// 🔥 MOCKS
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

jest.mock("@/src/hooks/members/useInsertMembers", () => ({
  useInsertMembers: jest.fn(),
}));

describe("Página de Cadastro de Membro", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useParams as jest.Mock).mockReturnValue({ token: "FAKE_TOKEN" });

    (jwtDecode as jest.Mock).mockReturnValue({
      name: "Fulano Test",
      email: "fulano@test.com",
    });

    (useInsertMembers as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
    });
  });

  test("renderiza título principal", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { name: /Cadastro de Membro/i })
    ).toBeInTheDocument();
  });

  test("exibe o nome vindo do token decodificado", () => {
    render(<Page />);
    expect(screen.getByText(/Fulano Test/i)).toBeInTheDocument();
  });

  test("renderiza os campos do formulário", () => {
    render(<Page />);

    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Numero de Telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
  });

  test("botão Criar existe", () => {
    render(<Page />);
    expect(
      screen.getByRole("button", { name: /Criar/i })
    ).toBeInTheDocument();
  });

  test("envia formulário chamando mutate", () => {
    render(<Page />);

    fireEvent.change(screen.getByLabelText(/Nome Completo/i), {
      target: { value: "Teste Nome" },
    });
    fireEvent.change(screen.getByLabelText(/Numero de Telefone/i), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "teste@teste.com" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Criar/i }));

    expect(mockMutate).toHaveBeenCalledTimes(1);

    expect(mockMutate).toHaveBeenCalledWith(
      {
        name: "Teste Nome",
        phone: "123",
        email: "teste@teste.com",
        password: "123456",
      },
      expect.any(Object) // onSuccess
    );
  });
});
