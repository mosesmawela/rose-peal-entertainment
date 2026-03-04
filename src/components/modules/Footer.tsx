export const Footer = () => {
    return (
        <footer className="w-full py-12 px-6 border-t border-white/5 mt-20 relative z-10 bg-black/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Brand */}
                <div className="flex flex-col gap-2">
                    <span className="font-bold tracking-widest text-xs text-white/40">ROSE PEARL ENTERTAINMENT</span>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} All Rights Reserved.
                    </p>
                </div>

                {/* Links */}
                <div className="flex gap-8">
                    {["Instagram", "Twitter", "Email"].map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="text-[10px] uppercase tracking-widest text-white/40 hover:text-rose-500 transition-colors"
                        >
                            {link}
                        </a>
                    ))}
                </div>

            </div>
        </footer>
    );
};
