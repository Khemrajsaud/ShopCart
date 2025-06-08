
import "./globals.css";
import {Toaster} from "react-hot-toast";
const Rootlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" >
      <body className="font-poppins antialiased">{children}
<Toaster
position="bottom-right"
toastOptions={{
  style:{
    background: "#000000",
    color: "#fff",
  },
}}
/>

      </body>
    </html>
  );
};
export default Rootlayout;

     