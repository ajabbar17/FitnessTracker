const OverviewCard = ({ title, value, icon }) => {
    return (
      <div className="flex items-center border-2 border-gray-100 bg-white shadow-md rounded-lg p-4">
        <div className="p-3 bg-gray-100 rounded-full mr-4">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    );
  };
  
  export default OverviewCard;
  