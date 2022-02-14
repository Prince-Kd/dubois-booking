import AdminHeader from "./admin-header";
import AdminSidebar from "./admin-sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="grid grid-cols-4 h-screen">
      <div >
        <AdminSidebar />
      </div>
      <div className="col-span-3 flex flex-col h-full">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}

