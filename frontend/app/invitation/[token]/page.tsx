"use client";

import { useForm } from "@/src/hooks/useForm";
import { useInsertMembers } from "@/src/hooks/members/useInsertMembers";
import { useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Page() {
  const params = useParams();
  const token = params.token;

  interface JwtPayload {
    name: string;
    email: string;
  }

  
  const decoded = jwtDecode<JwtPayload>(""+token);

  const { mutate, isPending, isSuccess, isError, error } = useInsertMembers();

  const formDefault = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  const { form, handleChange, setForm } = useForm(formDefault);

  function insertMember(e: any) {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        setForm(formDefault);
      },
    });
  }

  return (
    <div className="isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-288.75"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Cadastro de Membro
        </h2>
        <p className="mt-2 text-lg/8 text-gray-400">
          <b>{decoded.name}</b> <br/> Finalize o Cadastro para Virar Membro
        </p>
      </div>
      <form
        onSubmit={insertMember}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        method="post"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="first-name"
              className="block text-sm/6 font-semibold text-white"
            >
              Nome Completo
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm/6 font-semibold text-white"
            >
              Numero de Telefone
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  type="text"
                  placeholder="(00) 00000.0000"
                  onChange={handleChange}
                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-3 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm/6 font-semibold text-white"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm/6 font-semibold text-white"
            >
              Senha
            </label>
            <div className="mt-2.5">
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={isPending}
            className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}
