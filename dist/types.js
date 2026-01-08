/**
 * Type definitions for Jabrod SDK
 */
// Error
export class JabrodError extends Error {
    code;
    status;
    details;
    constructor(code, message, status = 400, details) {
        super(message);
        this.name = 'JabrodError';
        this.code = code;
        this.status = status;
        this.details = details;
    }
}
//# sourceMappingURL=types.js.map