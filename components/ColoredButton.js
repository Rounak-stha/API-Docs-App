export default function ColoredButton({ text, handleClick, disabled=false }) {
   return (
    <button 
        disabled={disabled}
        className={`bg-btn-bg active:scale-90 text-center ${ disabled ? 'cursor-not-allowed': 'cursor-pointer hover:bg-highlight-light'} px-4 pt-1 pb-1.5 text-sky-50 font-semibold rounded-md`}
        onClick={handleClick}
    >
        {text}
    </button>
   )
}