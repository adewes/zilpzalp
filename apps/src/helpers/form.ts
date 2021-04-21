import Settings from "./settings";

export function isEmpty(value: string): bool {
    return value === undefined || value === null || value === "";
}

export default class Form {
    data: Record<string, any>;
    settings: Settings;
    _errors: Record<string, any>;

    constructor(
        data: Record<string, any>,
        settings: Settings,
        error: Record<string, any>
    ) {
        this.data = data || {};
        this.settings = settings;
        this._errors = this.validate();
        this._valid = Object.keys(this._errors).length === 0;
        if (error !== undefined) {
            this._errorMessage = error.message;
            for (const [k, v] of Object.entries(error.errors || {})) {
                this._errors[k] = v;
            }
        }
    }

    get errors() {
        return this._errors;
    }

    get valid() {
        return this._valid;
    }

    get errorMessage() {
        return this._errorMessage;
    }

    get error() {
        return {
            message: this.errorMessage,
            errors: this.errors
        };
    }

    validate(): Record<string, string> {
        return {};
    }
}
