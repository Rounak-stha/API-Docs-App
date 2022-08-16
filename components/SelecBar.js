export default function SelectBar({ options, view, onClick }) {
    return (
        <div className="flex">
            {options.map((option, i) => <option key={i} className={`
                text-center px-4 md:px-6 py-2 border-2 border-bdr-clr font-medium
                ${option === view ? 'text-highlight-light': ''}
                ${i !== 0 ? `border-l-0 ${i === (options.length - 1) ? 'rounded-tr-lg': ''}`: 'rounded-tl-lg'}
                `}
                onClick={() => onClick(option)}
                >
                    {option}
                </option>)}
        </div>
    )
}