import { useEffect, useState } from "react";


export default function ScanHistory() {
  const [scans, setScans] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [scanRes, summaryRes] = await Promise.all([
          fetch("http://localhost:5000/api/scans"),
          fetch("http://localhost:5000/api/summary"),
        ]);
        const scansData = await scanRes.json();
        const summaryData = await summaryRes.json();

        setScans(scansData);
        setSummary(summaryData);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading Scan History...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <h2 className="text-2xl font-semibold text-gray-800">Scan History</h2>
      <p className="text-gray-500">View all your previous allergen scans and results</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <CardContent>
            <p className="text-sm text-gray-500">Total Scans</p>
            <h3 className="text-3xl font-bold">{summary.totalScans}</h3>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent>
            <p className="text-sm text-gray-500">Allergens Detected</p>
            <h3 className="text-3xl font-bold text-yellow-600">
              {summary.allergensDetected}
            </h3>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent>
            <p className="text-sm text-gray-500">Safe Foods</p>
            <h3 className="text-3xl font-bold text-green-700">
              {summary.safeFoods}%
            </h3>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent>
            <p className="text-sm text-gray-500">Risk Alerts</p>
            <h3 className="text-3xl font-bold text-red-600">
              {summary.riskAlerts}
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Scan History Table */}
      <Card className="mt-6">
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Recent Scan History</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="pb-2">Food Item</th>
                <th className="pb-2">Allergens</th>
                <th className="pb-2">Safety Status</th>
                <th className="pb-2">Date & Time</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {scans.map((scan) => (
                <tr key={scan._id} className="border-b">
                  <td className="py-2">{scan.foodItem}</td>
                  <td>
                    {scan.allergens.length > 0
                      ? scan.allergens.join(", ")
                      : "None"}
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        scan.safetyStatus === "Safe"
                          ? "bg-green-500"
                          : scan.safetyStatus === "Moderate"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {scan.safetyStatus} ({scan.safetyPercent}%)
                    </span>
                  </td>
                  <td>
                    {new Date(scan.dateTime).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}


