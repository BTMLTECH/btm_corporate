<script lang="ts">
  type InputType =
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "file"
    | "checkbox"
    | "radio"
    | "range"
    | "color"
    | "hidden"
    | "button"
    | "submit"
    | "reset"
    | "image";

  // Props with defaults and spread remaining props
  export let type: InputType = "text";
  export let value: string = "";
  export let placeholder: string = "";
  export let name: string = "";
  export let id: string = "";
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let maxlength: number | null | undefined = undefined;
  export let minlength: number | null | undefined = undefined;
  export let pattern: string | undefined = undefined;
  export let step: number | undefined = undefined;
  export let autocomplete: "on" | "off" = "off";
  export let ariaLabel: string | undefined = "";
  export let ariaDescribedby: string | undefined = "";
  export let ariaInvalid: boolean | undefined = false;
  export let className: string = ""; // Default empty string for className

  // Event forwarding
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export function handleInput(event: Event) {
    dispatch("handleInput", event); // Forward the input event
  }

  export let onInput: (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => void;

  function handleBlur(
    event: FocusEvent & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) {
    dispatch("blur", event); // Forward the blur event
  }

  function handleFocus(
    event: FocusEvent & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) {
    dispatch("focus", event); // Forward the focus event
  }

  function handleChange(
    event: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) {
    dispatch("change", event); // Forward the change event
  }
</script>

<!-- Input element with bound properties -->
{#if type === "text"}
  <input
    type="text"
    bind:value
    {name}
    {id}
    {required}
    {disabled}
    {readonly}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-invalid={ariaInvalid}
    class="btm-input {className}"
    on:input={e => {
      handleInput(e)
      onInput(e)
    }}
  />
{:else if type === "number"}
  <input
    type="number"
    bind:value
    {name}
    {id}
    {required}
    {disabled}
    {readonly}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-invalid={ariaInvalid}
    class="btm-input {className}"
    on:input={e => {
      handleInput(e)
      onInput(e)
    }}
  />
{:else if type === "email"}
  <input
    type="email"
    bind:value
    {name}
    {id}
    {required}
    {disabled}
    {readonly}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-invalid={ariaInvalid}
    class="btm-input {className}"
    on:input={e => {
      handleInput(e)
      onInput(e)
    }}
  />
{:else if type === "checkbox"}
  <input
    type="checkbox"
    bind:group={value}
    {name}
    {id}
    {required}
    {disabled}
    {readonly}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-invalid={ariaInvalid}
    class="btm-input {className}"
    on:input={e => {
      handleInput(e)
      onInput(e)
    }}
  />
{:else if type === "radio"}
  <input
    type="radio"
    bind:group={value}
    {name}
    {id}
    {required}
    {disabled}
    {readonly}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    class="btm-input {className}"
    on:input={e => {
      handleInput(e)
      onInput(e)
    }}
  />
{/if}
