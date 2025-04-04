export interface TreeNode<T> {
    data: T;
    children: Array<TreeNode<T>>;
}

export function arrayToTree<T extends { id: string; parent?: { id: string } | null }>(
    items: T[],
): Array<TreeNode<T>> {
    const map = new Map<string, TreeNode<T>>();
    const roots: Array<TreeNode<T>> = [];

    // Create nodes for all items
    for (const item of items) {
        map.set(item.id, {
            data: item,
            children: [],
        });
    }

    // Connect nodes to form tree structure
    for (const item of items) {
        const node = map.get(item.id)!;
        if (item.parent?.id) {
            const parent = map.get(item.parent.id);
            if (parent) {
                parent.children.push(node);
            }
        } else {
            roots.push(node);
        }
    }

    return roots;
} 