<script lang="ts">
  export let onInput: (
    e: Event & {
      currentTarget: EventTarget & HTMLSelectElement;
    }
  ) => void;
  export let name: string;
  export let id: string;
  export let options: Array<{ value: string; text: string }>;
  export let value: string
</script>

<select
  {name}
  {id}
  on:input={onInput}
  {value}
  class="w-full border-b-2 border-blue-500 rounded-none px-2 pb-1 outline-none peer-focus:ring-1 focus:ring-blue-500 text-gray-900 bg-white"
>
  {#each options as option, idx}
    <option value={option.value}>{option.text}</option>
  {/each}
</select>
