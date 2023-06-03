import React from "react";
import BlockWrapper from "../Wrappers/BlockWrapper";

const Block = ({ num }) => {
  return (
    <BlockWrapper>
      {/* Adding classes to the divs of blocks/tiles to have appropriate colors. */}
      <div className={`tile ${num <= 4096 ? "x" + num : "x8192"}`}>
        {/* Not displaying any when the digit is zero */}
        {num !== 0 ? num : ""}
      </div>
    </BlockWrapper>
  );
};

export default Block;
