import type { ReactNode } from "react";

declare global {
    interface BaseProps {
        id?: string;
        className?: string;
    }

    interface ReactNodeProps extends BaseProps {
        children?: ReactNode;
    }
}

export {};