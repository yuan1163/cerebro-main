import React from "react";

// styles

import cn from "classnames";
import styles from "@core/ui/components/DataGrid/styles.module.scss";

type Props = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const DataGridCellContent: React.FC<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn(styles["data-grid-cell-content"], className)}>
      {children}
    </div>
  );
};
