import { BoltIcon } from "@heroicons/react/24/outline"

import './NavBar.css'

const NavBar = () => {
  return (
    <div className="header container">
      <div className="right">
        <a href="#">
          <svg><BoltIcon /></svg>
          HUMAN BENCHMARK
        </a>
        <a href="#">
          DASHBOARD
        </a>
      </div>
      <div className="left">
        <a href="#">Sign up</a>
        <a href="#">Log In</a>
      </div>
    </div>
  )
}

export default NavBar