import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="dashboard-sidebar">
      <ul>
        <li className="list-item"><i class="fa-solid fa-globe sidebar-icon"></i> <Link to="/locations">Store Locations</Link></li>
        <li className="list-item"><i class="fa-solid fa-book sidebar-icon"></i><Link to="/recommendations">Book Recommendations</Link></li>
      </ul>
    </div>
  );
}


