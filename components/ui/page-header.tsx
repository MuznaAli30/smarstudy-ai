interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6 animate-fade-in sm:mb-8">
      <h1 className="text-2xl font-bold tracking-tight gradient-text sm:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-1.5 text-sm text-muted sm:mt-2 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
