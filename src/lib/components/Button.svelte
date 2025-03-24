<script lang="ts">
  export let btnText: string;
  export let onInput: (
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    }
  ) => void;
  export let className: string | undefined = undefined;
  export let btnType: "button" | "reset" | "submit" = "button";
</script>

<button type={btnType} class={className} on:click={onInput}>{btnText}</button>
