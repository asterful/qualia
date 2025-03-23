<script lang="ts">
    import EasyMDE from "$lib/components/EasyMDE.svelte";
</script>

<div class="left-column">
    <div class="left-column-inner">
        <div class="site-logo">Welcome to Qualia!</div>
        <div class="nav-bar">
            <p>Clock</p>
            <p>About</p>
            <p>Placeholder</p>
        </div>
    </div>
</div>

<div class="center-column">
    <div class="center-column-inner">
        <div class="top-bar">
            <div class="title">
                <span>Kathe</span>
            </div>
        </div>
        <EasyMDE></EasyMDE>
    </div>
</div>

<div class="right-column"></div>

<style>
    .top-bar {
        display: flex;
        justify-items: center;
        border-block: solid 1px #363636;
    }
    .title {
        flex: 1 0 0;
        vertical-align: middle;
        display: flex;
        align-items: center;
        color: #555555;
        padding-left: 15px;
        padding-block: 10px;
    }
    .nav-bar {
        display: flex;
        flex-direction: column;
    }

    .site-logo {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .left-column-inner {
        width: var(--sidebar-left-width);
        max-width: 100%;
        height: 100%;
        margin-left: auto;
    }

    .center-column-inner {
        height: 100%;
    }

    .left-column {
        height: 100%;
        flex: 0 0 calc((100vw - var(--page-width)) / 2);
        border-right: solid 1px #363636;
        width: var(--sidebar-left-width);
        min-width: var(--sidebar-left-width);
        padding-top: 32px;
        padding-left: 16px;
    }

    .right-column {
        height: 100%;
        padding-top: 32px;
        flex: 0 0 calc((100vw - var(--page-width)) / 2);
        border-left: solid 1px #363636;
        width: var(--sidebar-left-width);
        min-width: var(--sidebar-left-width);
    }

    @media screen and (max-width: 1000px) {
        .right-column {
            display: none;
        }
    }

    @media screen and (max-width: 750px) {
        .left-column {
            display: none;
        }
    }

    .center-column {
        flex: 1 0 0;
        display: flex;
        flex-direction: column;
        width: 70%;
    }
</style>
