const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        website: {
            type: String,
        },
        picture: {
            type: String,
        },
    },
    { timestamps: true },
);

module.exports = mongoose?.models?.Companies || mongoose.model("Companies", companySchema);
