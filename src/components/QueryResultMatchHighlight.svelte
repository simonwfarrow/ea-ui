<script lang="ts">
    import QueryTermMatch from '../stores/query/query-term-match';

    export let queryTermMatch: QueryTermMatch;
</script>

<div class="italic text-xs">
    <div class="not-italic font-bold">{queryTermMatch.propertyName}:</div>
    <div style="padding: 0; margin: 0;">{@html queryTermMatch.textBeforeMatch.replaceAll(' ', '&nbsp;')}</div>
    <div style="padding: 0; margin: 0; background-color: #0086BC; border-radius: 0;">&nbsp;{queryTermMatch.termMatched}&nbsp;</div>
    <div style="padding: 0; margin: 0;">{@html queryTermMatch.textAfterMatch.replaceAll(' ', '&nbsp;')}</div>
    <div style="margin-right: 10px;" />
</div>
