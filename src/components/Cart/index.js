import React, {useState} from "react";
import ShoppingCartSection from "./ShoppingCartSection";
import AddressSection from "./AddressSection";

const CartSection = () => {
  const [tab, setTab] = useState(0);
  return (
    <div>
      {tab === 0 ? (
        <ShoppingCartSection setTab={() => setTab(1)} />
      ) : (
        <AddressSection setTab={() => setTab(0)} />
      )}
    </div>
  );
};

export default CartSection;
