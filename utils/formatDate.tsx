export function formatDate(input: Date | string | number): string {
    const date = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return `${date.toDateString()} ${date.toTimeString().split(" ")[0]}`;
}
