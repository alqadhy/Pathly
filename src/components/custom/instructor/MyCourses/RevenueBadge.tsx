type Props = {
  label: string;
  value: string | number;
};

const RevenueBadge = ({ label, value }: Props) => {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-card">
      <span className="text-body-sm text-text-secondary">{label}</span>

      <span className="mt-2 text-h4 font-bold text-primary">{value}</span>
    </div>
  );
};

export default RevenueBadge;