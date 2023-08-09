import React from "react";
import style from "./style.module.css";
import InstructionCard from "@/components/Common/InstructionCard/InstructionCard";

const Instruction = () => {
  return (
    <div className={style.main_wrapper}>
      <p className={style.heading}>Care Instructions</p>
      <div className="flex">
        <InstructionCard />
        <InstructionCard />
        <InstructionCard />
        <InstructionCard />
      </div>
    </div>
  );
};

export default Instruction;
