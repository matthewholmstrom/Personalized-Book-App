import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";



export default function Converted() {

  const navigate = useNavigate();
  return (
    <div className="dashboard-page">
      <Header />

      <div className="dashboard-container">
        <Sidebar />

        <div className="content-column">
          <main className="dashboard-content">
            <section className="main-card-wrapper">
              <h2>My Library</h2>
              <p>Look through the books that I own.</p>
              <button className="main-button" onClick={() => navigate("/dashboard")}>See Books</button>
            </section>

            <section className="card-row">
              <div className="card-wrapper main-card">
                <h3>My Book Wishlist</h3>
                <p>Browse all the books that I want to buy.</p>
                <button className="main-button" onClick={() => navigate("/wishlist")}>See Books</button>
              </div>

              <div className="card-wrapper main-card">
                <h3>View Store Locations</h3>
                <p>Compare different store locations for prices.</p>
                <button className="main-button" onClick={() => navigate("/locations")}>See Locations</button>
              </div>
            </section>

            <section className="single-card-wrapper">
              <div className="card-wrapper main-card">
                <h3>Book Recommendations?</h3>
                <p>Get book recommendations based on author or genre. </p>
                <button className="main-button" onClick={() => navigate("/recommendations")}>What's Next</button>
              </div>
            </section>
          </main>

          <footer className="converted-footer">
            © 2025 My Library. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}