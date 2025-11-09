type Props = {
  color?: string;
  title?: string;
  subTitle?: string;
};

export default function Card(p: Props) {
  return (
    <div className={`rounded-xl border border-none bg-gray-800 p-6 text-white text-center ${p.color}`}>
      <h3 className="text-4xl font-semibold">{p.title}</h3>
      <p className="text-sm text-white-400 mt-2">{p.subTitle}</p>
    </div>
  );
}
