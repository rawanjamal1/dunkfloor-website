import { useEffect, useRef, useState } from "react";
export function useReveal(){
    const ref= useRef(null);
    useEffect(() => {
        const el = ref.current;
        if(!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting){el.classList.add("visible");observer.disconnect();}},
            {threshold:0.12}
        );
        observer.observe(el);
        return () => observer.disconnect();
    },[]);
    return ref;
}
export function useCounter(target){
    const [value, setValue]= useState(0);
    const ref = useRef(null);
    const started = useRef(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting && !started.current) {
                    started.current=true;
                    let current=0;
                    const step=Math.ceil(target / 60);
                    const timer = setInterval(()=> {
                        current +=step;
                        if(current>= target){setValue(target); clearInterval(timer)}
                    else setValue(current);
                    },25 );
                }
            },
            {threshold:0.5}
        );
        observer.observe(el);
        return() => observer.disconnect();
    }, [target] );
    return {value, ref};
}