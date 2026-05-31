export function LoadingSpinner() {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-200" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 animate-[spin-slow_0.8s_linear_infinite]" />
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-indigo-400"
            style={{
              animation: `pulse-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <span className="text-sm text-muted">AI is thinking...</span>
    </div>
  );
}
