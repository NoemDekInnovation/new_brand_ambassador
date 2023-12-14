import React, { ReactNode } from "react";

export const Required = ({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div>
      {children} <span className={`text-red-500 ${className}`}>*</span>
    </div>
  );
};
