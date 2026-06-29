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
    Draft = "Draft",
    Pending = "Pending",
    Processing = "Processing",
    Processed = "Processed",
    Served = "Served",
    Completed = "Completed",
    Paid = "Paid",
}
