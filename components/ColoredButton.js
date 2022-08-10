export default function ColoredButton({ text, handleClick }) {
   return (
    <div 
        className="bg-btn-bg active:scale-90 hover:bg-highlight-light text-center cursor-pointer px-4 pt-1 pb-1.5 text-sky-50 font-bold rounded-md"
        onClick={handleClick}
    >
        {text}
    </div>
   )
}