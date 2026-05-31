import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: string;
  href?: string;
  loading?: boolean;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  href,
  loading,
}: StatCardProps) {
  const content = (
    <div className="glass-card rounded-2xl p-6 card-hover h-full">
      <div className="flex items-start justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        {loading ? (
          <div className="h-8 w-16 animate-shimmer rounded-lg" />
        ) : (
          <span className="text-2xl font-bold gradient-text">{value}</span>
        )}
      </div>
      <h2 className="font-semibold text-base mb-1">{title}</h2>
      <p className="text-sm text-muted">{description}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
