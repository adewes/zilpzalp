interface ElementClassWithNames extends JSX.ElementClass {
    displayName?: string;
    name?: string;
}

export const displayName = (
    WrappedComponent: ElementClassWithNames
): string => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
};
