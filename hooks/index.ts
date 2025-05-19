import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(callback:()=> void){
    const ref= useRef<T>(null);
    useEffect(()=>{
        const handleclickdOutside=(e:MouseEvent)=>{
            if(ref.current && !ref.current.contains(e.target as Node)){
                callback();
            }
        }
        document.addEventListener('mousedown',handleclickdOutside);
        return ()=>{
            document.removeEventListener('mousedown', handleclickdOutside);

        }
    },[callback])
    return ref;
}