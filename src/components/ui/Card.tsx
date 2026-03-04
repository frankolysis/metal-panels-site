import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 overflow-hidden",
        hover && "transition-shadow hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
