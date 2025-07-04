"use client";

import { useState } from "react";

export default function Home() {
  const [cv, setCV] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://localhost:4000/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, jobDescription: jobDesc }),
      });
      const data = await res.json();
      setResult(data.tailoredCV || "No result.");
    } catch (err) {
      console.error(err);
      setResult("Error contacting backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-2xl border border-blue-100">
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-8 tracking-tight">
          AutoPilot CV <span className="inline-block">✈️</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-800 font-semibold text-lg">
              Paste your CV:
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm resize-none min-h-[150px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={cv}
              onChange={(e) => setCV(e.target.value)}
              placeholder="Paste your CV here..."
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-800 font-semibold text-lg">
              Paste Job Description:
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm resize-none min-h-[150px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the job spec here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl shadow transition-all duration-200"
          >
            {loading ? "Tailoring your CV..." : "Generate Tailored CV"}
          </button>
        </form>

        {result && (
          <div className="mt-10 bg-gray-100 border border-gray-300 rounded-2xl p-6 max-h-[400px] overflow-y-auto">
            <h2 className="text-xl font-bold text-green-700 mb-2">
              Tailored CV:
            </h2>
            <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
