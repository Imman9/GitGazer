export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white shadow rounded-lg p-4">Commit Activity</div>
      <div className="bg-white shadow rounded-lg p-4">Repositories</div>
      <div className="bg-white shadow rounded-lg p-4">Streaks</div>
      <div className="bg-white shadow rounded-lg p-4">Top Languages</div>
      <div className="bg-white shadow rounded-lg p-4">Recent PRs</div>
      <div className="bg-white shadow rounded-lg p-4">Badges</div>
    </div>
  );
}
