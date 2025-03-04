const ERROR_TYPES = {
    NETWORK_ERROR: { message: '네트워크 오류 발생: ' }
};

class CustomError extends Error {
    constructor(errorType, detail = "") {
        super(errorType.message);
        this.detail = detail;
    }

    toString() {
        return `[${this.code}] ${this.message} ${this.detail}`;
    }
}

export { ERROR_TYPES, CustomError };
