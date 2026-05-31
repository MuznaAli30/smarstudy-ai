"use client";

import { useEffect, useState } from "react";
import type { DashboardStats } from "@/lib/types/stats";
import { apiFetch } from "@/lib/api/client";

export function useStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<DashboardStats>("/api/stats")
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}
