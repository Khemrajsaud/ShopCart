import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface contactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: contactItemData[] = [
  {
    title: "Visit Us",
    subtitle: "New Orlean, USA",
    icon: (
      <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+12 977 643 867",
    icon: (
      <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "khemrajsaud56@gmail.com",
    icon: (
      <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-col-2  border-b">
      {data?.map((item, index) => (
        <div
          key={index}
          className="flex item-center gap-3 group hover: bg-gray-50 p-4 transition-colors"
        >
          {item?.icon}

          <div>
            <h3 className=" font-semibold text-gray-900 group-hover:text-black hoverEffect">{item?.title}</h3>
            <p className="text-sm text-gray-600  mt-1 group-hover:text-gray-900 hoverEffect">{item?.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
