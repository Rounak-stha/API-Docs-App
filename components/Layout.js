import NavRows from "./NavRows";
import { useRouter } from 'next/router'
import HamIcon from "./HamIcon";


export default function Layout({ children }) {
    const router = useRouter()

    const path = router.pathname.split('/')[1]
    const unAuthed = path === 'auth' || path === 'error' || router.query.guest === 'true'

    return (
        <div className="grid grid-cols-12 h-screen">
            { unAuthed ? null :
            <>
                <input 
                    id='toggle-navrows' 
                    onChange={(e) => {
                        const checked = e.target.checked
                        if (checked) {
                            document.getElementById('nav-rows-container').classList.add('show-navbar')
                            document.getElementById('ham-icon').style.display = 'none' 
                            document.getElementById('cross').style.display = 'inline' 
                        }
                        else {
                            document.getElementById('nav-rows-container').classList.remove('show-navbar')
                            document.getElementById('ham-icon').style.display = 'inline' 
                            document.getElementById('cross').style.display = 'none'
                        }
                    }} 
                    className="hidden h-6 w-6" 
                    type='checkbox' 
                />
                <label htmlFor="toggle-navrows" id="toggle-navrows-label" className="block md:hidden absolute top-1 right-4 z-10">
                    <span id='ham-icon'><HamIcon /></span>
                    <span id='cross' className="hidden text-2xl font-semibold text-highlight-light mr-1">X</span>
                </label>
                <div id='nav-rows-container' className="hidden md:block md:col-span-3 lg:col-span-2 border-r-2 border-bdr-clr">
                    <div className="sticky top-0">
                        <NavRows />
                    </div>              
                </div>
            </>
            }
            <div className={`col-start-1 col-span-12 md:col-start-4 md:col-span-9 lg:col-start-3 lg:col-span-10 ${unAuthed ? 'col-start-1 col-span-12 md:col-start-1 md:col-span-12 lg:col-start-1 lg:col-span-12': ''}`}>
                <div className="h-full pt-10 px-2 md:px-10">
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}