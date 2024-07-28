import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="m-4 flex gap-8 flex-col">
      <Outlet />
    </div>
  );
};
