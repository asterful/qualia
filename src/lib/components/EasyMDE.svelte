<script lang="ts">
    import { onMount } from "svelte";
    import 'easymde/dist/easymde.min.css';
    let textarea: HTMLTextAreaElement;

    onMount(async () => {
        let EasyMDE = (await import("easymde")).default;
        const easyMDE = new EasyMDE({
            autosave: {
                enabled: true,
                uniqueId: "MyUniqueID",
                delay: 1000,
                submit_delay: 5000,
                timeFormat: {
                    locale: 'en-US',
                    format: {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    },
                },
                text: "Autosaved: "
            },
            element: textarea,
            lineNumbers: true,
            syncSideBySidePreviewScroll: false,
            scrollbarStyle: "native",
            spellChecker: false,
            initialValue: `# Kathe (˶˃ ᵕ ˂˶) .ᐟ.ᐟ

Parece ser una persona que aprecia mucho el esfuerzo que haces para interesarte en lo que le gusta, viste muy lindo, con muchos accesorios. 

Ella también es muy linda, lo primero que pensé al verla es que era muy tierna y pequeña, dan como deseos de cuidarla, me gustaron sus cejas y sus ojos un poco grandes.

Es una persona muy amable, muy agradable y vale la pena hacer todo mi esfuerzo por conocerla mejor.

- Su sueño es plantar fresas y tener una casita con jardín como Hachi
- Cumple el **8 de agosto**
- Si sólo pudiera llevar tres cosas a una isla desierta llevaría su Nintendo DS, un cargador de Nintendo DS y un generador solar jejejeje

Incluso cuando yo me quedé sin palabras para decir, ella hizo el esfuerzo para mantener la conversación fluyendo, le dí una muy mala primera impresión ( • ᴖ • ｡) pero deseo esforzarme por llegar a un nivel cálido de entendimiento y confianza, para así dejar florecer mis formas de expresarme y mis lenguajes de amor y cariño

### Dulces favoritos 🍦

- Paletas de leche
- Chocolate blanco
- Chocolates cookie and cream
- Cosas con fruta
- Maní
- M&M de maní

### Sus flores favoritas ✿

Lirios campana
![[LiriosCampana.jpg|500]]

'No me olvides'
![[NoMeOlvidesFlor.jpg|500]]

Hortensias
![[Hortensias.webp|500]]

Me recomendó ver [[Hiroshima Mon Amour (1959)]], una película sobre el olvido y el amor.

Me dijo que sonrió cuando le dije lo que opinaba de la película (˶˃ ᵕ ˂˶) .ᐟ.ᐟ es una persona que realmente aprecia la muestra de interés.

Ella también hace un esfuerzo grande por interesarse en lo que a mí me gusta, me hace sentir cálido al hablarle de lo que me gusta.
`
        });
    });
</script>

<div class="container">
    <textarea id="editor" bind:this={textarea}></textarea>
</div>

<style>
    .container {
        height: calc(100% - 57px);
    }
    :global(.EasyMDEContainer) {
        height: 100% !important;
        border: 0px;
    }
    :global(.CodeMirror) {
        height: calc(100% - 30px - 49px) !important;
    }
    :global(.editor-toolbar, .editor-toolbar i) {
        border: 0px;
    }
</style>