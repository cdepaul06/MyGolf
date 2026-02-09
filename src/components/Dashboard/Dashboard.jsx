import { useMeQuery } from "../../api/queries/users.queries";
import GolfAppBar from "../GolfAppBar/GolfAppBar";

const Dashboard = ({ user, ...props }) => {
  const { data: me, isLoading, error } = useMeQuery();

  console.log("Me query data:", me);

  if (isLoading) {
    return (
      <div className='bg-green-50 min-w-screen min-h-screen flex flex-col items-center justify-center p-4'>
        <h1 className='text-green-600 font-bold text-4xl mb-4'>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-green-50 min-w-screen min-h-screen flex flex-col items-center justify-center p-4'>
        <h1 className='text-red-600 font-bold text-4xl mb-4'>Error</h1>
        <p className='text-lg mb-6'>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <GolfAppBar user={user} />
      <div className='bg-green-50 min-w-screen min-h-screen flex flex-col items-center justify-center p-4'>
        <h1 className='text-green-600 font-bold text-4xl mb-4'>Dashboard</h1>
        <p className='text-lg mb-6'>Welcome, {me?.email}!</p>
      </div>
    </>
  );
};

export default Dashboard;
