import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page";
import { useInsertIntention } from "@/src/hooks/intentions/useInsertIntentions";

const mockMutate = jest.fn();

jest.mock("@/src/hooks/intentions/useInsertIntentions");
jest.mock("@/src/hooks/useForm", () => {
  return {
    useForm: (defaultValues: any) => {
      let form = { ...defaultValues };
      return {
        form,
        handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          form = {
            ...form,
            [e.target.name]: e.target.value,
          };
        },
        setForm: jest.fn(),
      };
    },
  };
});

const mockUseInsertIntention = useInsertIntention as jest.Mock;

describe("Página de Cadastro de Participação (Intention)", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseInsertIntention.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
    });
  });

  it("renderiza título e descrição", () => {
    render(<Page />);

    expect(
      screen.getByText("Cadastro de Participação")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Um e-mail com o convite será enviado/i)
    ).toBeInTheDocument();
  });

  it("renderiza campos do formulário", () => {
    render(<Page />);

    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Empresa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Numero de Telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Por que você que parcipar/i)).toBeInTheDocument();
  });

  it("envia o formulário chamando mutate", () => {
    render(<Page />);

    fireEvent.change(screen.getByLabelText(/Nome Completo/i), {
      target: { value: "João", name: "name" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "joao@email.com", name: "email" },
    });
    fireEvent.change(screen.getByLabelText(/Numero de Telefone/i), {
      target: { value: "999999999", name: "phone" },
    });
    fireEvent.change(screen.getByLabelText(/Por que você que parcipar/i), {
      target: { value: "Quero aprender", name: "message" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar/i }));

    expect(mockMutate).toHaveBeenCalled();
  });

  it("botão desabilita quando isPending=true", () => {
    mockUseInsertIntention.mockReturnValueOnce({
      mutate: mockMutate,
      isPending: true,
      isSuccess: false,
      isError: false,
      error: null,
    });

    render(<Page />);

    const button = screen.getByRole("button", { name: /Enviar/i });
    expect(button).toBeDisabled();
  });
});
