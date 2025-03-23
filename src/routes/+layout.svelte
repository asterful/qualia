<script lang="ts">
    let { children } = $props();
</script>

<div id="page-container">
    {@render children()}
</div>

<style>
    @font-face {
        font-family: "Hack Nerd";
        font-style: normal;
        font-weight: 400;
        src: url($lib/fonts/HackNerdFontPropo-Regular.ttf);
    }

    @font-face {
        font-family: "Fira Code Nerd";
        font-style: normal;
        font-weight: 400;
        src: url($lib/fonts/FiraCodeNerdFontPropo-Regular.ttf);
    }

    #page-container {
        font-family: "Hack Nerd";
        background-color: var(--color-surface);
        width: 100%;
        height: 100%;
        max-width: 100%;
        position: relative;
        display: flex;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        overflow: hidden;
        color: var(--color-on-surface);
    }

    :global(body, html) {
        margin: 0;
        padding: 0;
        height: 100%;
        box-sizing: border-box;
    }

    :global(:root) {
        --color-primary-50: #E6F2F9;
        --color-primary-100: #D2E7F4;
        --color-primary-200: #A5CFE9;
        --color-primary-300: #78B7DE;
        --color-primary-400: #4B9FD3;
        --color-primary-500: #2d82b7;
        --color-primary-600: #246993;
        --color-primary-700: #1B4F6F;
        --color-primary-800: #12344A;
        --color-primary-900: #091A25;
        --color-primary-950: #040C10;
        --color-on-surface: #091A25;
        --color-surface: #FFFFFF;
        --page-width: 900px;
        --sidebar-left-width: 280px;
    }
</style>