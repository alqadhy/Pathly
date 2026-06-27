function Footer() {
  return (
    <footer className="bg-card-foreground text-popover px-8 py-4 flex justify-between items-center">
      <p>Copyright &copy; {new Date().getFullYear()} | All Rights Reserved</p>
      <p>
        Made By The{" "}
        <span className="text-secondary font-bold">React.js Team</span>
      </p>
    </footer>
  );
}

export default Footer;
