import React, { useState } from "react";
import { Input, Table, Tag, Collapse, Typography, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

// ==========================================
// 1. Grouped Dummy Data
// ==========================================
const dummyHistoryData = [
  {
    date: "January 15, 2025",
    websites: [
      {
        id: 1,
        name: "Hacker News",
        url: "https://news.ycombinator.com",
        updated: 2,
      },
      { id: 2, name: "Tech Blog", url: "https://techblog.com", updated: -1 },
    ],
  },
  {
    date: "January 14, 2025",
    websites: [
      { id: 3, name: "Old Site", url: "https://oldsite.com", updated: 0 },
      { id: 4, name: "News Hub", url: "https://newshub.com", updated: 5 },
    ],
  },
];

function History() {
  // ==========================================
  // 2. State & Filtering Logic
  // ==========================================
  const [searchText, setSearchText] = useState("");

  const filteredData = dummyHistoryData
    .map((dateGroup) => {
      const filteredWebsites = dateGroup.websites.filter(
        (site) =>
          site.name.toLowerCase().includes(searchText.toLowerCase()) ||
          site.url.toLowerCase().includes(searchText.toLowerCase()),
      );
      return { ...dateGroup, websites: filteredWebsites };
    })
    .filter((dateGroup) => dateGroup.websites.length > 0);

  return (
    // ==========================================
    // 3. Main Layout Container
    // ==========================================
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Scraping History
        </h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by website name or URL..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* ==========================================
            4. Date Grouping (Accordion)
            ========================================== */}
        <div className="space-y-4">
          {filteredData.map((dateGroup, index) => (
            // <details> is a native HTML accordion! No React state needed.
            <details
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
              open={index === 0} // Opens the first date by default
            >
              <summary className="px-4 py-3 font-bold text-gray-700 cursor-pointer hover:bg-gray-50 text-lg">
                {dateGroup.date}
              </summary>

              {/* ==========================================
                  5. Inner Table for Websites
                  ========================================== */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="p-4 text-gray-500 uppercase text-xs">
                        ID
                      </th>
                      <th className="p-4 text-gray-500 uppercase text-xs">
                        Website Name
                      </th>
                      <th className="p-4 text-gray-500 uppercase text-xs">
                        URL
                      </th>
                      <th className="p-4 text-gray-500 uppercase text-xs">
                        Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dateGroup.websites.map((site) => (
                      <tr
                        key={site.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-4 text-gray-700">{site.id}</td>
                        <td className="p-4 font-semibold text-gray-800">
                          {site.name}
                        </td>
                        <td className="p-4">
                          <a
                            href={site.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {site.url}
                          </a>
                        </td>

                        {/* ==========================================
                            6. Updated Tags (Conditional Rendering)
                            ========================================== */}
                        <td className="p-4">
                          {site.updated > 0 ? (
                            <span className="px-2 py-1 text-xs font-bold bg-green-100 text-green-800 rounded">
                              +{site.updated} Added
                            </span>
                          ) : site.updated < 0 ? (
                            <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-800 rounded">
                              {site.updated} Removed
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-bold bg-gray-100 text-gray-800 rounded">
                              No Change
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
