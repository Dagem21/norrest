export enum userTypes {
    Customer = "Customer",
    Business = "Business",
    Admin = "Admin",
}

export enum permissionTypes {
    Admin = "Admin",
    Read = "Read",
    Update = "Update",
    Delete = "Delete",
    Create = "Create",
}

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
