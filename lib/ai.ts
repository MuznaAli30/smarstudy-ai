export async function runAI(type: string, text: string) {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, text }),
  });

  return response.json();
}
