import type { ReactNode } from "react";

declare global {
    interface BaseProps {
        id?: string;
        className?: string;
        label?: string;
    }

    // T = shape ของ input, errors = array ของ message ต่อ field
    interface FormState<T = Record<string, unknown>> {
        errors?: { [K in keyof T]?: string[] };
        message?: string;
        success?: boolean;
        values?: Partial<Record<keyof T, string>>;
    }

    interface FormProps<T = Record<string, string[]>> extends BaseProps {
        action: (
            prevState: FormState<T>,
            formData: FormData
        ) => Promise<FormState<T>>;
    }

    interface ReactNodeProps extends BaseProps {
        children?: ReactNode;
    }
}

export { };
