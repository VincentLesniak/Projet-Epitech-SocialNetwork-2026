const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 mt-auto border-t border-slate-100 bg-white">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="text-slate-400 text-sm font-medium">
          © {currentYear}{" "}
          <span className="text-blue-600/80 font-bold">Connect'in</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
