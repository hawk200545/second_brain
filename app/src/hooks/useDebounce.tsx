import { useEffect, useState } from "react";

export default function useDebounce(value: string,delay: number){
    const [debouncedVal,setdebouncedVal] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setdebouncedVal(value);
        },delay);

        return () => {
            clearTimeout(handler);
        }
    },[value,delay])
    return debouncedVal;
}