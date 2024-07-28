export type Status = { type: "success" | "error"; message: string };
export const FormStatus = ({ status }: { status?: Status }) => {
  if (!status) return null;
  return (
    <div
      className={`p-2 text-white ${
        status.type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {status.message}
    </div>
  );
};
