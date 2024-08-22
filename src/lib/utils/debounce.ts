
type DebouncedFn = (input: string) => void  
export default function debounce(fn: DebouncedFn | any, delay: number) {
    let timeout: null | number = null

    return (input: string) => {
        if (timeout)
            clearTimeout(timeout)
        timeout = setTimeout(() => {
            console.log("first")
        	fn(input)
        }, delay)
    }
}