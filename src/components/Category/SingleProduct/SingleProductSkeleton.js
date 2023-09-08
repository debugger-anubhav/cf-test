import {Skeleton} from "@mui/material";
import React from "react";

export default function SingleProductSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 macbook:px-[122px] xl:px-[90px] md:px-[70px] px-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item, index) => (
        <div
          className="w-full 3xl:h-[400px] 2xl:h-[300px] xl:h-[250px] lg:h-[200px] sm:h-[150px] h-[100px]"
          key={index.toString}>
          <Skeleton width={"100%"} height={"100%"} variant="rectangular" />
        </div>
      ))}
    </div>
  );
}
