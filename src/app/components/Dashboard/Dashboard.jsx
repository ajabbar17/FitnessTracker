
import { FaFire, FaDumbbell, FaClipboardList } from 'react-icons/fa';
import OverviewCard from './OverviewCard';
import BarChart from './BarChart';
import LineChart from './LineChart';

const Dashboard = () => {
  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Fitness Dashboard</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <OverviewCard
          title="Calories Consumed"
          value="2,300"
          icon={<FaFire size={24} className="text-red-500" />}
        />
        <OverviewCard
          title="Protein Intake"
          value="150g"
          icon={<FaDumbbell size={24} className="text-blue-500" />}
        />
        <OverviewCard
          title="Total Planned Workouts"
          value="5 Workouts"
          icon={<FaClipboardList size={24} className="text-green-500" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-gray-200 shadow-md rounded-lg p-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Weekly Calorie & Protein Intake</h2>
          <BarChart />
        </div>
        <div className="bg-white shadow-md h-full border-2 border-gray-200 rounded-lg p-2 md:p-6">
          <h2 className="text-lg md:text-xl  font-bold mb-4">Monthly Progress</h2>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
