// src/components/News.jsx
import React from "react";
import { Calendar, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 *  props:
 *    type  : "headline" | "latest" | "mostread"
 *    item  : { title, date, source, impact, summary, image }
 */
export default function News({ type = "latest", item }) {
  if (!item) return null; // guard

  // 🔧 warna border impact
  const impactColor =
    item.impact === "High"
      ? "border-red-500"
      : item.impact === "Medium"
      ? "border-yellow-400"
      : "border-gray-500";

  // ======= STYLE VARIANTS =======
  const isHeadline = type === "headline";
  const isMostRead = type === "mostread";

  // ukuran gambar & height card
  const imgHeight = isHeadline ? "h-40" : "h-24";
  const cardPadding = isHeadline ? "p-5" : "p-4";

  return (
    <Card
      className={`bg-gradient-to-b from-[#000000] to-[#1a1c2c] border border-white/10 rounded-xl overflow-hidden shadow hover:scale-[1.01] transition`}
    >
      <CardContent
        className={`${cardPadding} space-y-3 text-white/90 border-l-4 ${impactColor}`}
      >
        {/* IMG */}
        <img
          src={item.image}
          alt={item.title}
          className={`${imgHeight} w-full object-cover rounded-md`}
        />

        {/* TITLE */}
        <h3
          className={`font-semibold leading-snug ${
            isHeadline ? "text-lg" : "text-base"
          }`}
        >
          {item.title}
        </h3>

        {/* META */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {item.date}
          </span>
          <span className="flex items-center gap-1">
            <Globe size={14} /> {item.source}
          </span>
        </div>

        {/* IMPACT badge */}
        <span
          className={`inline-block text-xs px-2 py-0.5 rounded font-semibold ${
            item.impact === "High"
              ? "bg-red-500 text-white"
              : item.impact === "Medium"
              ? "bg-yellow-400 text-black"
              : "bg-gray-400 text-white"
          }`}
        >
          {item.impact} Impact
        </span>

        {/* SUMMARY (hide for most‑read mini) */}
        {!isMostRead && (
          <p
            className={`text-sm text-gray-300 leading-relaxed ${
              isHeadline ? "" : "line-clamp-3"
            }`}
          >
            {item.summary}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
