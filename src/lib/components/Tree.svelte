<script lang="ts">
    import { NumberData, DataNode, NilNode, NodeColor, RedBlackTree, type TreeNode } from "$lib/structures/RBTree";
    import type { BinaryTreeNode } from "binary-tree-visualizer";
    import { onMount } from "svelte";

    let tree: RedBlackTree<NumberData>;
    let selected: TreeNode<NumberData>;
    let textBox: number;
    let insertedNodes: number[];

    async function buildTreeVisualization(node: TreeNode<NumberData>) {
        const { BinaryTreeNode } = await import("binary-tree-visualizer");
        let result: BinaryTreeNode<number | string>;
        if (node instanceof DataNode) {
            let content = "";
            if (node.color == NodeColor.Black) {
                content = `B: ${node.data.data}`;
            } else {
                content = `R: ${node.data.data}`;
            }
            result = new BinaryTreeNode<string>(content);
            let left = await buildTreeVisualization(node.left);
            let right = await buildTreeVisualization(node.right);
            if (left) result.setLeft(left);
            if (right) result.setRight(right);
            return result;
        }
        else if (node == tree.root) return new BinaryTreeNode<string>(" ");
    }

    async function updateTree() {
        const { drawBinaryTree, VisualizationType } = await import("binary-tree-visualizer");
        const root = await buildTreeVisualization(tree.root);
        if (!root) return;
        drawBinaryTree(root, document.querySelector("#tree")!, {
            type: VisualizationType.HIGHLIGHT,
            maxWidth: 500,
            maxHeight: 500,
        });
        tree.root = tree.root;
    }

    function insert() {
        tree.insert(new NumberData(textBox));
        updateTree();
    }

    function deleteNode() {
        tree.delete(new NumberData(textBox));
        updateTree();
    }

    function randomAdd() {
        let n = Math.floor(Math.random() * 100);
        tree.insert(new NumberData(n));
        insertedNodes.push(n);
        updateTree();
    }

    function randomRemove() {
        let n = Math.floor(Math.random() * insertedNodes.length);
        let node = insertedNodes[n];
        tree.delete(new NumberData(node));
        insertedNodes.splice(n, 1);
        updateTree();
    }

    onMount(async () => {
        const { setTheme } = await import("binary-tree-visualizer");
        setTheme({ radius: 30, fontSize: 12 });
        tree = new RedBlackTree(new NilNode());
        insertedNodes = [];
        selected = tree.root.left;
        updateTree();
    });
</script>

<div class="container">
    <div>
        <input type="number" bind:value={textBox}>
        <button on:click={insert}>Insert</button>
        <button on:click={deleteNode}>Delete</button>
        <button on:click={randomAdd}>Random add</button>
        <button on:click={randomRemove}>Random remove</button>
    </div>
    <canvas id="tree"></canvas>
</div>

<style>
    .container {
        border: solid 1px black;
        display: inline-block;
        margin-block: 20px;
    }
</style>
