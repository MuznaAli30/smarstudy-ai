interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight gradient-text">{title}</h1>
      {description && (
        <p className="mt-2 text-muted text-base">{description}</p>
      )}
    </div>
  );
}
