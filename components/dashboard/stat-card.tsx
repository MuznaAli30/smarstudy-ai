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
    <div className="glass-card card-hover h-full rounded-2xl p-4 sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4">
        <span className="text-xl sm:text-2xl">{icon}</span>
        {loading ? (
          <div className="h-8 w-16 animate-shimmer rounded-lg" />
        ) : (
          <span className="truncate text-xl font-bold gradient-text sm:text-2xl">
            {value}
          </span>
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
