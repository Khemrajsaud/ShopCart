import { cn } from "@/lib/utils";

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-2xl font-semibold text-shop_dark_green tracking-wide capitalize",
        className
      )}
    >
      {children}
    </h2>
  );
};

const SubText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn("text-gray-600 text-sm", className)}>{children}</p>;
};

const SubTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h3 className={cn("font-semibold text-gray-900 font-sans", className)}>{children}</h3>;
};
export { Title, SubTitle,SubText };
