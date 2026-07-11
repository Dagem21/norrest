export enum userTypes {
    Customer = "Customer",
    Business = "Business",
    Admin = "Admin",
}

export enum permissionTypes {
    Admin = "Admin",

    "OrderRead" = "OrderRead",
    OrderUpdate = "OrderUpdate",
    OrderDelete = "OrderDelete",
    OrderCreate = "OrderCreate",

    MenuRead = "MenuRead",
    MenuUpdate = "MenuUpdate",
    MenuDelete = "MenuDelete",
    MenuCreate = "MenuCreate",

    EmployeeRead = "EmployeeRead",
    EmployeeUpdate = "EmployeeUpdate",
    EmployeeDelete = "EmployeeDelete",
    EmployeeCreate = "EmployeeCreate",
}

export const permissionDisplayNames: Record<permissionTypes, string> = {
    [permissionTypes.Admin]: "Full Administrator Access",

    [permissionTypes.OrderCreate]: "Create Orders",
    [permissionTypes.OrderRead]: "View Orders",
    [permissionTypes.OrderUpdate]: "Edit Orders",
    [permissionTypes.OrderDelete]: "Delete Orders",

    [permissionTypes.MenuCreate]: "Create Menu Items",
    [permissionTypes.MenuRead]: "View Menus",
    [permissionTypes.MenuUpdate]: "Edit Menu Items",
    [permissionTypes.MenuDelete]: "Delete Menu Items",

    [permissionTypes.EmployeeCreate]: "Add New Employees",
    [permissionTypes.EmployeeRead]: "View Employee Profiles",
    [permissionTypes.EmployeeUpdate]: "Edit Employee Info",
    [permissionTypes.EmployeeDelete]: "Remove Employees",
};

export enum roleTypes {
    Owner = "Owner",
    Manager = "Manager",
    Waiter = "Waiter",
    Chef = "Chef",
}

export enum toastTypes {
    success = "success",
    error = "error",
    warning = "warning",
}

export enum categoryTypes {
    "Appetizers/Starters" = "Appetizers/Starters",
    "Soups & Salads" = "Soups & Salads",
    "Main Courses (Entrées)" = "Main Courses (Entrées)",
    "Side Dishes, Desserts" = "Side Dishes, Desserts",
    "Beverages" = "Beverages",
    "Fast Foods" = "Fast Foods",
}

export enum orderStatusTypes {
    Cart = "Cart",
    Pending = "Pending",
    Processing = "Processing",
    Processed = "Processed",
    Served = "Served",
    Completed = "Completed",
    Paid = "Paid",
}

export enum companyStatusTypes {
    Active = "Active",
    Closed = "Closed",
    Deleted = "Deleted",
}

export enum branchStatusTypes {
    Active = "Active",
    Closed = "Closed",
    Deleted = "Deleted",
}

export enum employeeStatusTypes {
    Active = "Active",
    Deactivated = "Deactivated",
    Blocked = "Blocked",
    Deleted = "Deleted",
}

export enum userStatusTypes {
    Active = "Active",
    Deactivated = "Deactivated",
    Blocked = "Blocked",
    Deleted = "Deleted",
}
