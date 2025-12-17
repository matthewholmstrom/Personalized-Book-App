import React from "react";
import Header from "../components/Header";
import RecommendationsForm from "../components/RecommendationsForm";
import Sidebar from "../components/Sidebar";

export default function RecommendationsPage() {
  return (
    <div className="dashboard-page">
      <Header />

      <div className="dashboard-container">
        <Sidebar/>
        
        <main className="dashboard-content">
          <RecommendationsForm />
        </main>
      </div>
    </div>
  );
}