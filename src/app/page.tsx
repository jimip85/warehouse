"use client";

import { useState } from "react";
import {
  generatePickingList,
  PickingListItems,
} from "@/api/generatePickingList";
import { generatePackingList, PackingLists } from "@/api/generatePackingList";
import PRODUCT_MAP from "@/data/productMap.json";
import ORDERS_DATA from "@/data/orders.json";
import DateSelection from "@/components/DateSelection";
import PickingList from "@/components/PickingList";
import PackingList from "@/components/PackingList";
import ActionButton from "@/components/ActionButton";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [pickingList, setPickingList] = useState<PickingListItems>([]);
  const [packingList, setPackingList] = useState<PackingLists>([]);
  const [activeTab, setActiveTab] = useState<"picking" | "packing" | null>();

  const handleGeneratePickinglist = () => {
    setActiveTab("picking");
    const list = generatePickingList(ORDERS_DATA, PRODUCT_MAP, selectedDate);
    setPickingList(list);
  };

  const handleGeneratePackinglist = () => {
    setActiveTab("packing");
    const list = generatePackingList(ORDERS_DATA, PRODUCT_MAP, selectedDate);
    setPackingList(list);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-5xl font-semibold text-center text-gray-900 tracking-tight mb-8">
        Warehouse App
      </h1>
      <DateSelection value={selectedDate} onChange={setSelectedDate} />

      <div className="flex flex-col md:flex-row gap-4 my-6 justify-center">
        <ActionButton
          label="Packing Team"
          onClick={handleGeneratePackinglist}
          variant="primary"
        />
        <ActionButton
          label="Picking Team"
          onClick={handleGeneratePickinglist}
          variant="secondary"
        />
      </div>
      {activeTab === "picking" && <PickingList items={pickingList} />}
      {activeTab === "packing" && <PackingList orders={packingList} />}
    </div>
  );
}
