"use client";

import { userTypes } from "@/assets/enums/enum";
import BusinessDashboard from "@/components/pages/business/dashboard";
import CustomerDashboard from "@/components/pages/customer/dashboard";
import { MenuContext } from "@/providers/menu";
import { useContext } from "react";

export default function Dashboard() {
    const menuContext = useContext(MenuContext);

    return (
        <>
            {menuContext?.user?.type === userTypes.Customer && <CustomerDashboard />}
            {menuContext?.user?.type === userTypes.Business && <BusinessDashboard />}
        </>
    );
}
