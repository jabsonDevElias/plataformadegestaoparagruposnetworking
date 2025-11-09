import Card from "@/src/components/Card";

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card color="bg-lime-500" title="100" subTitle="Total de membros ativos."/>
          <Card color="bg-red-500" title="100" subTitle="Total de indicações feitas no mês."/>
          <Card color="bg-yellow-500" title="121" subTitle="Obrigados no Mês"/>
      </div>
    </>
  );
}
