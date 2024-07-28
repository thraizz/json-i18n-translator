import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="flex gap-8 flex-col">
      <Outlet />
    </div>
  );
};
