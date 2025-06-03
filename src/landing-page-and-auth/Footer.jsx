import '../index.css';
function Footer() {
  return (
      <footer className='flex flex-col gap-3 mb-5 md:flex-row md:justify-between md:items-center mt-10 text-base text-[#d5d3b9]'>
          <div className="nav-item">
            <a href="">&copy; {new Date().getFullYear()} LughaNest.All rights reserved.</a>
          </div>
          <div className="nav-item">
              <a href="/terms-and-conditions">Terms and Conditions</a>
          </div>
          <div className="nav-item">
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
      </footer>
  )
}

export default Footer
