import React from "react";
import Header from "../components/Header";
import LocationsTable from "../components/LocationsTable";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <Header />

      <div className="dashboard-container">
        <Sidebar/>

        <main className="dashboard-content">
          <LocationsTable />
        </main>
      </div>
    </div>
  );
}