import { useCounter } from "../hooks";
function Counter({target, label}){
    const {value, ref}= useCounter(target);
    return(
        <div className="stat-item" ref={ref}>
            <span className="stat-num">{value}+</span>
            <div className="stat-label">{label}</div>

        </div>
    );
}
export default Counter;