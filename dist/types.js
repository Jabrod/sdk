/**
 * Jabrod SDK Types
 */
// ============================================
// Error Class
// ============================================
/**
 * Custom error class for Jabrod API errors
 */
export class JabrodError extends Error {
    code;
    status;
    details;
    constructor(code, message, status, details) {
        super(message);
        this.name = 'JabrodError';
        this.code = code;
        this.status = status;
        this.details = details;
    }
}
//# sourceMappingURL=types.js.map