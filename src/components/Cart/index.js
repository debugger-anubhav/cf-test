import React, {useState} from "react";
import AddressSection from "./AddressSection";
import ShoppingCartSection from "./ShoppingCartSection";

const CartSection = () => {
  const [tab, setTab] = useState(0);
  return (
    <div>
      {/* <AddressSection /> */}
      {tab === 0 ? (
        <ShoppingCartSection setTab={() => setTab(1)} />
      ) : (
        <AddressSection setTab={() => setTab(0)} />
      )}
    </div>
  );
};

export default CartSection;
