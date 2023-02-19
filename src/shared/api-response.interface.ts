export default class ApiResponse<T> {
    constructor(status: number, data: T, message?: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
    status: number;
    data: T | null;
    message: string | null;
}
