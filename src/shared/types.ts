export type Precision = "high" | "medium" | "low";
export function isPrecision(obj: any) {
    return obj === "high" || obj === "medium" || obj === "low";
}
