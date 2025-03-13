export interface Ordereable<T> {
    compareTo(other: T): number;
    isLessThan(other: T): boolean;
    isGreaterThan(other: T): boolean;
    isEqualTo(other: T): boolean;
}

export enum NodeColor {
    Black, Red
}

export class NilNode {
    is_nil = true;
    color = NodeColor.Black;
    size = 0;
    parent = this;
    left = this;
    right = this;

    constructor() {}
}

export class DataNode<T extends Ordereable<T>> {
    is_nil = false;
    data: T;
    color: NodeColor;
    size: number;
    parent: TreeNode<T>;
    left: TreeNode<T>;
    right: TreeNode<T>;

    constructor(data: T, color: NodeColor, parent: TreeNode<T>, left: TreeNode<T>, right: TreeNode<T>) {
        this.data = data;
        this.color = color;
        this.size = 1;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}

export type TreeNode<T extends Ordereable<T>> = NilNode | DataNode<T>;

export class RedBlackTree<T extends Ordereable<T>> {
    root: TreeNode<T>;
    nil: TreeNode<T>;

    constructor(root: TreeNode<T>) {
        this.root = root;
        this.nil = new NilNode();
    }

    public find(node: TreeNode<T>, data: T): TreeNode<T> {
        if (node instanceof NilNode) return this.nil;
        if (node.data.isEqualTo(data)) return node;
        else if (node.data.isLessThan(data)) return this.find(node.right, data);
        else return this.find(node.left, data);
    }

    // Order statistic 
    // Gets the i-th smallest element
    public select(x: TreeNode<T>, i: number): TreeNode<T> {
        let r = x.left.size + 1;
        if (i == r)
            return x;
        else if (i < r)
            return this.select(x.left, i);
        else
            return this.select(x.right, i - r);
    }

    // Order statistic 
    // Finds the rank of the element x (it's index)
    public rank(x: TreeNode<T>) {
        let r = x.left.size + 1;
        let y = x;
        while (y != this.root) {
            if (y == y.parent.right)
                r = r + y.parent.left.size + 1;
            y = y.parent;
        }
        return r
    }

    public minimum(node: TreeNode<T>) {
        let x = node;
        while (!x.left.is_nil) {
            x = x.left;
        }
        return x;
    }

    public succesor(node: TreeNode<T>) {
        let x = node;
        if (!x.right.is_nil) {
            return this.minimum(x.right);
        }
        let y = x.parent;
        while (!y.is_nil && x == y.right) {
            x = y;
            y = y.parent;
        }
        return y;
    }

    public insert(i: T) {
        if (i instanceof NilNode) return;
        if (!this.find(this.root, i).is_nil) return;
        let nodeToInsert = new DataNode(i, NodeColor.Red, this.nil, this.nil, this.nil);
        let y = this.nil;
        let x = this.root;
        while (!(x instanceof NilNode)) {
            y = x;
            y.size += 1;
            if (nodeToInsert.data.isLessThan(x.data))
                x = x.left;
            else
                x = x.right;
        }
        nodeToInsert.parent = y;
        if (y instanceof NilNode)
            this.root = nodeToInsert;
        else {
            if (nodeToInsert.data.isLessThan(y.data))
                y.left = nodeToInsert;
            else
                y.right = nodeToInsert;
        }
        nodeToInsert.left = this.nil;
        nodeToInsert.right = this.nil;
        this.insertFix(nodeToInsert);
        return i;
    }

    private insertFix(z: TreeNode<T>) {
        while (!z.parent.is_nil && z.parent.color == NodeColor.Red) {
            if (z.parent == z.parent.parent.left) {
                let y = z.parent.parent.right;
                if (!y.is_nil && y.color == NodeColor.Red) {
                    z.parent.color = NodeColor.Black;
                    y.color = NodeColor.Black;
                    z.parent.parent.color = NodeColor.Red;
                    z = z.parent.parent
                } else {
                    if (z == z.parent.right) {
                        z = z.parent;
                        this.rotateLeft(z);
                    }
                    z.parent.color = NodeColor.Black;
                    z.parent.parent.color = NodeColor.Red;
                    this.rotateRight(z.parent.parent)
                }
            } else {
                let y = z.parent.parent.left;
                if (y.color == NodeColor.Red) {
                    z.parent.color = NodeColor.Black;
                    y.color = NodeColor.Black;
                    z.parent.parent.color = NodeColor.Red;
                    z = z.parent.parent;
                }
                else {
                    if (z == z.parent.left) {
                        z = z.parent;
                        this.rotateRight(z);
                    }
                    z.parent.color = NodeColor.Black;
                    z.parent.parent.color = NodeColor.Red;
                    this.rotateLeft(z.parent.parent);
                }
            }
        }
        this.root.color = NodeColor.Black;
    }

    public delete(i: T) {
        let z = this.find(this.root, i);
        if (z instanceof NilNode) return;
        let y = this.nil;
        if (z.left.is_nil || z.right.is_nil)
            y = z;
        else
            y = this.succesor(z);
        let x = this.nil;
        if (!y.left.is_nil)
            x = y.left;
        else
            x = y.right;
        x.parent = y.parent;
        if (y.parent.is_nil)
            this.root = x;
        else if (y == y.parent.left)
            y.parent.left = x;
        else
            y.parent.right = x;
        if (y != z && !(y instanceof NilNode))
            z.data = y.data;

        let backprop = y.parent
        while (!backprop.is_nil) {
            backprop.size = backprop.size - 1;
            backprop = backprop.parent;
        }

        if (y.color == NodeColor.Black) {
            this.deleteFix(x);
        }
        return i;
    }

    private deleteFix(node: TreeNode<T>) {
        let x = node;
        while (x != this.root && x.color == NodeColor.Black) {
            if (x == x.parent.left) {
                let w = x.parent.right;
                if (w.color == NodeColor.Red) {
                    w.color = NodeColor.Black;
                    x.parent.color = NodeColor.Red;
                    this.rotateLeft(x.parent);
                    w = x.parent.right;
                }
                if (w.left.color == NodeColor.Black && w.right.color == NodeColor.Black) {
                    w.color = NodeColor.Red;
                    x = x.parent;
                } else {
                    if (w.right.color == NodeColor.Black) {
                        w.left.color = NodeColor.Black;
                        w.color = NodeColor.Red;
                        this.rotateRight(w);
                        w = x.parent.right;
                    };
                    w.color = x.parent.color;
                    x.parent.color = NodeColor.Black;
                    w.right.color = NodeColor.Black;
                    this.rotateLeft(x.parent);
                    x = this.root;
                }
            } else {
                let w = x.parent.left;
                if (w.color == NodeColor.Red) {
                    w.color = NodeColor.Black;
                    x.parent.color = NodeColor.Red;
                    this.rotateRight(x.parent);
                    w = x.parent.left;
                }
                if (w.right.color == NodeColor.Black && w.left.color == NodeColor.Black) {
                    w.color = NodeColor.Red;
                    x = x.parent;
                }
                else {
                    if (w.left.color == NodeColor.Black) {
                        w.right.color = NodeColor.Black;
                        w.color = NodeColor.Red;
                        this.rotateLeft(w);
                        w = x.parent.left;
                    }
                    w.color = x.parent.color;
                    x.parent.color = NodeColor.Black;
                    w.left.color = NodeColor.Black;
                    this.rotateRight(x.parent);
                    x = this.root;
                }
            }
        }
        x.color = NodeColor.Black;
    }

    public rotateLeft(x: TreeNode<T>) {
        let y = x.right;
        if (y.is_nil) return;
        x.right = y.left;
        if (!y.left.is_nil)
            y.left.parent = x;
        y.parent = x.parent;
        if (x.parent.is_nil)
            this.root = y;
        else if (x.parent.left == x)
            x.parent.left = y;
        else
            x.parent.right = y;
        y.left = x;
        x.parent = y;
        y.size = x.size;
        x.size = x.left.size + x.right.size + 1;
    }

    public rotateRight(x: TreeNode<T>) {
        let y = x.left;
        if (y.is_nil) return;
        x.left = y.right;
        if (!y.right.is_nil)
            y.right.parent = x;
        y.parent = x.parent;
        if (x.parent.is_nil)
            this.root = y;
        else if (x.parent.right == x)
            x.parent.right = y;
        else
            x.parent.left = y;
        y.right = x;
        x.parent = y;
        y.size = x.size;
        x.size = x.left.size + x.right.size + 1;
    }

    // Function to test tree validity
    public isRedBlackTree(): boolean {
        if (this.root.is_nil) return true;

        const testValidity = (node: TreeNode<T>): [number, boolean] => {
            if (node.is_nil) return [0, true];
            const [leftHeight, leftValid] = testValidity(node.left);
            const [rightHeight, rightValid] = testValidity(node.right);
            if (!leftValid || !rightValid) return [-1, false];
            if (rightHeight != leftHeight) return [-1, false];
            if (node.color == NodeColor.Black) {
                return [1 + leftHeight, true];
            } else {
                if ((node.left.color == NodeColor.Red) || (node.right.color == NodeColor.Red)) {
                    return [-1, false];
                }
                return [leftHeight, true];
            }
        }
        if (this.root.color !== NodeColor.Black) {
            return false;
        }
        let [, result] = testValidity(this.root);
        return result;
    }
}

export class NumberData implements Ordereable<NumberData> {
    data: number;

    constructor(data: number) {
        this.data = data;
    }
    
    compareTo(other: NumberData): number {
        if (this.data == other.data) return 0;
        if (this.data > other.data) return 1;
        return -1; 
    }
    
    isLessThan(other: NumberData): boolean {
        return this.data < other.data;
    }
    
    isGreaterThan(other: NumberData): boolean {
        return this.data > other.data;

    }

    isEqualTo(other: NumberData) {
        return this.data == other.data;
    }
}