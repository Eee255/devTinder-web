const Footer = () => {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow"> {/* Your main content will go here */} </div>
        <footer className="footer footer-center bg-slate-700 text-white p-4">
          <aside>
            <p>Copyright © {new Date().getFullYear()} - All rights reserved by Badri Industries Ltd</p>
          </aside>
        </footer>
      </div>
    );
  }
  
  export default Footer;
  