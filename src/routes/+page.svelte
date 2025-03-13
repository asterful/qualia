<script lang="ts">
    import Editor from '$lib/components/Editor.svelte';
    import Tree from '$lib/components/Tree.svelte';
</script>

<h1>Welcome to Qualia!    </h1>
<div>
    <!-- Actual editor -->
    <Editor></Editor>
</div>
<div>
    <!-- For visualization of the data structures -->
    <Tree></Tree>
</div>

<style>
    h1 {
        font-family: 'Hack Nerd';
    }
</style>