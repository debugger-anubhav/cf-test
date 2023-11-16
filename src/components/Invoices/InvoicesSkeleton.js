import React from "react";
import styles from "./styles.module.css";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Skeleton} from "@mui/material";

function InvoicesSkeleton() {
  return (
    <TableBody>
      {[1, 2, 3, 4, 5]?.map(item => (
        <TableRow key={item} className={styles.tableRow}>
          <TableCell className={`min-w-[116px] ${styles.tableCell}`}>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell className={`min-w-[116px] ${styles.tableCell}`}>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell className={`min-w-[116px] ${styles.tableCell}`}>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell className={`min-w-[116px] ${styles.tableCell}`}>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell className={`min-w-[116px] ${styles.tableCell}`}>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell className={`min-w-[116px] ${styles.tableCell}`}>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell className={`min-w-[116px] ${styles.tableCell}`}>
            <Skeleton variant="text" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default InvoicesSkeleton;
