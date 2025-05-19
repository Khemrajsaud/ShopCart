const Rootlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" >
      <body className="font-poppins antialiased">{children}</body>
    </html>
  );
};
export default Rootlayout;

     