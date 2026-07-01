function Footer() {
  return (
    <footer className="bg-card-foreground text-popover px-8 py-4 flex flex-wrap justify-between items-center gap-4 text-center">
      <p className="w-full md:w-auto">
        Copyright &copy; {new Date().getFullYear()} | All Rights Reserved
      </p>
      <p className="w-full md:w-auto">
        Made By The{" "}
        <span className="text-primary font-bold">React.js Team</span>
      </p>
    </footer>
  );
}

export default Footer;
