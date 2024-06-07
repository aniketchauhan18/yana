import { useNavigate } from "react-router-dom";
function Dashboard(): JSX.Element {
  const navigateTo = useNavigate();
  return (
    <main className="flex flex-col">
      <div className="flex justify-between items-center my-10 px-3 font-inter text-base sm:text-lg">
        <p>Dashboard</p>
        <button
          onClick={() => navigateTo(-1)}
          className="px-3 py-1 rounded-full text-base border bg-zinc-50"
        >
          Back
        </button>
      </div>
      <div className="flex justify-center text-4xl font-bold font-inter">
        <p>Want to Rent</p>
      </div>
    </main>
  );
}

export default Dashboard;
