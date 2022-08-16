import Link from "next/link";

const infoTexts = {
    configCode: ({ code }) => <span>Your configData has been saved. Use <span className="text-blue-600 font-semibold">{code}</span> as code in the next page</span>
}

export default function BigInfo({ type, nextRoute, data }) {
    return (
        <div className="h-screen w-screen fixed top-0 left-0 bg-dark opacity-75 z-50">
            <div className="h-full w-full flex justify-center items-center">
                <div className="opacity-100 rounded-md p-10 flex flex-col justify-center items-center bg-callout">
                    <p className="text-xl mb-4">{infoTexts[type](data)}</p>
                    <Link href={nextRoute}><p className="font-semibold cursor-pointer bg-blue-600 rounded-md active:scale-90 px-4 pt-[6px] pb-2">Okay</p></Link>
                </div>
            </div>
        </div>
    )
}