"use client";

import { useIntentios } from "@/src/hooks/intentions/useListIntentions";
import { EnvelopeIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

type Intention = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: boolean;
};

export default function Page() {
  const { data, isLoading, error } = useIntentios();

  if (isLoading) {
    return <div className="p-4 text-gray-300">Carregando...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-400">Erro ao carregar dados.</div>;
  }

  console.log(data);

  const rows = data ?? [];

  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                message
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"></th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700 bg-gray-900">
            {rows.length > 0 ? (
              rows.map((person: Intention) => (
                <tr key={person.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {person.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {person.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {person.phone}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {person.message}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button className="flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-md">
                      <EnvelopeIcon className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-4 py-4 text-sm text-gray-400 text-center"
                  colSpan={3}
                >
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
