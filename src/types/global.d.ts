import type { ReactNode } from "react";

declare global {
    interface BaseProps {
        id?: string;
        className?: string;
        label?:string
    }

    interface ReactNodeProps extends BaseProps {
        children?: ReactNode;
    }
}

export {};