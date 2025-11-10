"use client";

import { useDeleteIntention } from "@/src/hooks/intentions/useDeleteIntentions";
import { useIntentios } from "@/src/hooks/intentions/useListIntentions";
import { EnvelopeIcon, TrashIcon } from "@heroicons/react/24/outline";

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
  const { mutate, isPending, isSuccess, isError } = useDeleteIntention();

  if (isLoading) {
    return <div className="p-4 text-gray-300">Carregando...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-400">Failha ao carregar dados.</div>;
  }

  const rows = data ?? [];

  function deleteIntention(id: number) {
    mutate(id);
  }

  function sendInvitations(id: number) {
    mutate(id);
  }

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
              rows.map((intention: Intention) => (
                <tr key={intention.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {intention.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {intention.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {intention.phone}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {intention.message}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => sendInvitations(intention.id)}
                      className="flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-md"
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => deleteIntention(intention.id)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer"
                    >
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
