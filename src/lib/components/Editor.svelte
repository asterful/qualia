<script lang="ts">
    import { onMount } from "svelte";

    let viewLines: { line_count: number; is_first: boolean; line: string }[];

    onMount(() => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return;
        context.font = "24px Hack Nerd";
        viewLines = [];
        let lines = [
            "Hello world!",
            "How you're doing today?",
            "This is not necesarily the content reflected, this will have to beparsed",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in nunc risus. Duis a hendrerit lectus. Maecenas vitae fringilla arcu. Duis dapibus, dui molestie sollicitudin lacinia, massa nibh vulputate felis, sit amet consequat mauris risus sit amet ligula. Quisque sit amet lorem neque. Donec in sodales sem. Phasellus ante orci, sagittis quis semper in, vestibulum non ligula",
        ];

        // Test linewrap algorithm
        lines.forEach((line, index) => {
            let words = line.split(" ");
            let curLineLength = 0;
            let maxWidth = 430;
            let currentLine = "";
            let is_first = true;
            for (var word of words) {
                let wordLength = context.measureText(`${word} `).width;
                if (curLineLength + wordLength < maxWidth) {
                    currentLine += `${word} `;
                    curLineLength += wordLength;
                    words = words.slice(1);
                } else {
                    viewLines.push({
                        line_count: index + 1,
                        is_first,
                        line: currentLine,
                    });
                    currentLine = `${word} `;
                    curLineLength = wordLength;
                    is_first = false;
                }
            }
            viewLines.push({
                line_count: index + 1,
                is_first,
                line: currentLine,
            });
        });
        return viewLines;
    });
</script>

<div class="editor">
    <div class="lines">
        {#each viewLines as line}
            <div class="view-line">
                <div class="line-count">
                    <span>{#if line.is_first}{line.line_count}{/if}</span>
                </div>
                <div class="line-content">
                    <span>{line.line}</span>
                </div>
            </div>
        {/each}
    </div>
    <div class="cursor"></div>
</div>

<style>
    .editor {
        height: 400px;
        width: 500px;
        border: 1px solid black;
        cursor: text;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .line-count {
        display: inline;
        width: 20px;
        min-width: 20px;
        max-width: 20px;
        background-color: rgba(0, 0, 0, 0.1);
        overflow: hidden;
        font-size: 15px;
        vertical-align: middle;
        margin-right: 10px;
        text-align: center;
    }

    span {
        display: inline-flex;
        line-height: 30px;
        align-items: center;
    }

    .view-line {
        display: flex;
        width: 100%;
        margin-block: 5px;
        overflow: hidden;
        text-overflow: clip !important;
        white-space: nowrap !important;
        font-family: "Hack Nerd";
        font-size: 24px;
    }
</style>
