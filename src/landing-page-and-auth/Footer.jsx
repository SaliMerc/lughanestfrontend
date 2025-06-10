import '../index.css';

import { Link } from 'react-router-dom';

function Footer() {
  return (
      <footer className='flex flex-col gap-3 mb-5 md:flex-row md:justify-between md:items-center mt-10 text-base text-[#d5d3b9]'>
          <div className="nav-item">
            <Link to="/">&copy; {new Date().getFullYear()} LughaNest.All rights reserved.</Link>
          </div>
          <div className="nav-item">
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
          </div>
          <div className="nav-item">
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
      </footer>
  )
}

export default Footer
