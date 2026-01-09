export default function Footer() {
  return (
    <footer className="bg-green-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold mb-3">🌿 Susegad Fresh</h3>
          <p className="text-sm text-green-100">
            Fresh groceries delivered daily.  
            Sourced from trusted local farmers.
          </p>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-semibold mb-3">Information</h4>
          <ul className="space-y-2 text-sm text-green-100">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Get in Touch</h4>
          <p className="text-sm text-green-100 mb-4">
            Have questions or feedback?
          </p>
          <button className="bg-white text-green-800 px-5 py-2 rounded-lg hover:bg-green-100">
            Contact Us
          </button>
        </div>

      </div>

      <div className="text-center text-sm text-green-200 py-4 border-t border-green-700">
        © {new Date().getFullYear()} Susegad Fresh. All rights reserved.
      </div>
    </footer>
  );
}
