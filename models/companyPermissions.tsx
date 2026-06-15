const permissionsSchema = new mongoose.Schema(
    {
        companyID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branches",
            required: true,
        },
        branchID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branches",
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        permissions: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose?.models?.Permissions || mongoose.model("Permissions", permissionsSchema);
