<script lang="ts">
	let { children } = $props();
</script>

<nav>
	<a href="/">home</a>
</nav>

{@render children()}

<style>
    @font-face {
        font-family: 'Hack Nerd';
        font-style: normal;
        font-weight: 400;
        src: url($lib/fonts/HackNerdFontPropo-Regular.ttf);
    }
    
    @font-face {
        font-family: 'Fira Code Nerd';
        font-style: normal;
        font-weight: 400;
        src: url($lib/fonts/FiraCodeNerdFontPropo-Regular.ttf);
    }
</style>

