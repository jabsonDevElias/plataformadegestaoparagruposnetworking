import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page";

const mockUseIntentions = jest.fn();
const mockDeleteMutate = jest.fn();
const mockInsertInvitationMutate = jest.fn();

jest.mock("@/src/hooks/intentions/useListIntentions", () => ({
  useIntentios: () => mockUseIntentions(),
}));

jest.mock("@/src/hooks/intentions/useDeleteIntentions", () => ({
  useDeleteIntention: () => ({
    mutate: mockDeleteMutate,
    isPending: false,
    isSuccess: false,
    isError: false,
  }),
}));

jest.mock("@/src/hooks/invitations/useInsertInvitation", () => ({
  useInsertInvitation: () => ({
    mutate: mockInsertInvitationMutate,
  }),
}));

describe("Listagem de Intenções", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza Loading", () => {
    mockUseIntentions.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<Page />);
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  });

  it("renderiza Erro ao obter dados", () => {
    mockUseIntentions.mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(<Page />);
    expect(screen.getByText(/Failha ao carregar dados/i)).toBeInTheDocument();
  });

  it("exibe mensagem se lista vazia", () => {
    mockUseIntentions.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<Page />);
    expect(
      screen.getByText(/Nenhum registro encontrado/i)
    ).toBeInTheDocument();
  });

  it("renderiza lista de intenções", () => {
    mockUseIntentions.mockReturnValue({
      data: [
        {
          id: 1,
          name: "João",
          email: "joao@example.com",
          phone: "999",
          message: "Quero participar",
          status: true,
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<Page />);

    expect(screen.getByText("João")).toBeInTheDocument();
    expect(screen.getByText("joao@example.com")).toBeInTheDocument();
    expect(screen.getByText("999")).toBeInTheDocument();
    expect(screen.getByText("Quero participar")).toBeInTheDocument();
  });

  it("chama deleteIntention ao clicar no botão apagar", () => {
    mockUseIntentions.mockReturnValue({
      data: [
        {
          id: 1,
          name: "João",
          email: "joao@example.com",
          phone: "999",
          message: "Quero participar",
          status: true,
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<Page />);

    const buttons = screen.getAllByRole("button");
    const deleteButton = buttons[1]; // 1º enviar, 2º lixo

    fireEvent.click(deleteButton);

    expect(mockDeleteMutate).toHaveBeenCalledWith(1);
  });

  it("chama sendInvitations ao clicar no botão envelope", () => {
    mockUseIntentions.mockReturnValue({
      data: [
        {
          id: 1,
          name: "João",
          email: "joao@example.com",
          phone: "999",
          message: "Quero participar",
          status: true,
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<Page />);

    const buttons = screen.getAllByRole("button");
    const sendButton = buttons[0];

    fireEvent.click(sendButton);

    expect(mockInsertInvitationMutate).toHaveBeenCalledWith(1);
  });
});
