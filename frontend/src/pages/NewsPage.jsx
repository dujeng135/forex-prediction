import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";

const dummyNews = [
  {
    title: "FOMC Meeting Signals No Rate Cut Until Q4",
    date: "2025-07-08",
    source: "Bloomberg",
    summary:
      "The Fed held interest rates steady, but hinted at possible cuts later this year, pressuring USD and boosting gold prices.",
    image: "/news/fomc.jpg",
    url: "https://www.bloomberg.com/fomc-news",
    impact: "High",
  },
  {
    title: "US Jobless Claims Hit 3-Month High",
    date: "2025-07-07",
    source: "Reuters",
    summary:
      "Rising unemployment claims point to a cooling labor market, increasing expectations of a dovish Fed stance.",
    image: "/news/jobless.jpg",
    url: "https://www.reuters.com/jobless-claims",
    impact: "Medium",
  },
  {
    title: "Geopolitical Tensions Push Gold Higher",
    date: "2025-07-06",
    source: "CNBC",
    summary:
      "Gold gains as investors seek safe haven amid escalating conflict in the Middle East.",
    image: "/news/geopolitics.png",
    url: "https://www.cnbc.com/geopolitical-tensions",
    impact: "High",
  },
  {
    title: "China Gold Demand Increases in June",
    date: "2025-07-05",
    source: "Kitco",
    summary:
      "China’s central bank continues its gold accumulation, increasing reserves and supporting prices.",
    image: "/news/china-gold.png",
    url: "https://www.kitco.com/china-gold-demand",
    impact: "Medium",
  },
  {
    title: "ECB Signals No Immediate Policy Shift",
    date: "2025-07-04",
    source: "Investing.com",
    summary:
      "The ECB maintains current policy rate while monitoring inflation, keeping EUR stable against USD.",
    image: "/news/news1.png",
    url: "https://www.investing.com/ecb-policy-news",
    impact: "Low",
  },
];

export default function NewsPage() {
  const [impactFilter, setImpactFilter] = useState("");

  const filteredNews = dummyNews.filter((n) =>
    impactFilter ? n.impact === impactFilter : true
  );

  const latestNews = [...filteredNews].slice(1, 6);
  const mostRead = [...filteredNews].slice(2, 6);

  return (
    <MainLayout>
      <div className="px-6 py-7">
        <h1 className="text-3xl font-bold text-white mb-14 flex items-center gap-2">
          📢 News & Market Updates
        </h1>

        <div className="mb-9">
          <select
            value={impactFilter}
            onChange={(e) => setImpactFilter(e.target.value)}
            className="bg-zinc-800 text-white px-1 py-2 rounded-md border border-white/10"
          >
            <option value="">🔍 Filter by Impact</option><br></br><br></br>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Big News */}
          <div className="lg:col-span-1">
            <img
              src={filteredNews[0].image}
              alt={filteredNews[0].title}
              className="rounded-lg shadow-lg w-full h-56 object-cover mb-4"
            />
            <p className="text-sm text-gray-400">{filteredNews[0].date}</p>
            <a
              href={filteredNews[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="text-white text-xl font-semibold hover:text-yellow-300 mt-1">
                {filteredNews[0].title}
              </h2>
            </a>
            <p className="text-gray-300 text-sm mt-2">
              {filteredNews[0].summary}
            </p>
          </div>

          {/* Latest News */}
          <div>
            <h3 className="text-white text-lg font-semibold flex items-center gap-2 mb-4">
              🆕 Latest News
            </h3>
            <ul className="space-y-4">
              {latestNews.map((news, idx) => (
                <li key={idx}>
                  <p className="text-sm text-gray-400">{news.date}</p>
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-yellow-300 transition"
                  >
                    {news.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Most Read */}
          <div>
            <h3 className="text-white text-lg font-semibold flex items-center gap-2 mb-4">
              🔥 Most Read
            </h3>
            <ul className="space-y-4">
              {mostRead.map((news, idx) => (
                <li key={idx}>
                  <p className="text-sm text-gray-400">{news.date}</p>
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-yellow-300 transition"
                  >
                    {news.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
