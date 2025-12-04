import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthContext";

interface PlaybookStep {
  type: string;
  params: Record<string, unknown>;
}

interface Playbook {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  steps: PlaybookStep[];
}

export const PlaybooksPage: React.FC = () => {
  const { auth } = useAuth();

  const { data: playbooks } = useQuery<Playbook[]>({
    queryKey: ["playbooks"],
    queryFn: async () => {
      const res = await fetch("/api/playbooks", {
        headers: auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
      });
      if (!res.ok) {
        throw new Error("Failed to load playbooks");
      }
      return res.json();
    }
  });

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Playbooks</h1>
          <p className="text-xs text-slate-400">
            Define automated responses and analyst workflows for incidents.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500">
          New Playbook
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(playbooks || []).map((pb) => (
          <div
            key={pb.id}
            className="border border-slate-800 rounded-xl bg-slate-950/60 p-4 flex flex-col justify-between shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-sm text-white">{pb.name}</h2>
                <span
                  className={
                    "text-[10px] px-2 py-0.5 rounded-full " +
                    (pb.enabled
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-slate-700/60 text-slate-300")
                  }
                >
                  {pb.enabled ? "Enabled" : "Disabled"}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                {pb.description || "No description"}
              </p>
              <div className="text-[11px] text-slate-500">
                {pb.steps.length} step{pb.steps.length !== 1 ? "s" : ""}
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="text-[11px] px-2 py-1 border border-slate-700 rounded-md text-slate-200 hover:bg-slate-800">
                Edit
              </button>
              <button className="text-[11px] px-2 py-1 border border-emerald-600 rounded-md text-emerald-200 hover:bg-emerald-600/20">
                Run test
              </button>
            </div>
          </div>
        ))}
        {!playbooks?.length && (
          <div className="text-xs text-slate-500">
            No playbooks yet. Click &quot;New Playbook&quot; to create one.
          </div>
        )}
      </div>
    </div>
  );
};


