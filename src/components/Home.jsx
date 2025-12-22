const FollowText = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center text-center px-4
      bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] relative overflow-hidden"
    >
      {/* Soft glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_60%)]" />

      <div className="relative z-10 max-w-3xl">
        <p className="text-gray-400 text-sm sm:text-base mb-2 animate-fadeIn">
          Stay connected with us
        </p>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-snug animate-slideUp">
          Follow us on{" "}
          <a
            href="https://instagram.com/shailav.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-500
            bg-clip-text text-transparent hover:opacity-80 transition"
          >
            Instagram
          </a>
          , connect on{" "}
          <a
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-400 to-cyan-400
            bg-clip-text text-transparent hover:opacity-80 transition"
          >
            LinkedIn
          </a>{" "}
          & chat on{" "}
          <a
            href="https://wa.me/919015118744"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-400 to-emerald-400
            bg-clip-text text-transparent hover:opacity-80 transition"
          >
            WhatsApp
          </a>
        </h2>

        <p className="text-gray-500 mt-4 text-sm tracking-wide animate-fadeIn delay-200">
          Updates • Opportunities • Quick support
        </p>
      </div>
    </section>
  );
};

export default FollowText;
