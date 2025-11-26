'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const navItems = [
    {label:'Home', href:'/'},
    {label:'My Journey', href:'/my-journey'},
    {label:'Companions', href:'/companions'}
]

const NavItems = () => {

    const pathName = usePathname()

    return (

        <nav className='flex items-center gap-4'>
            {navItems.map(({label, href})=>
                (
                    <Link href={href} key={label} className={cn(pathName === href && 'text-primary font-semibold')}>
                        {label}
                    </Link>
                )
            )}
        </nav>
    )
}
export default NavItems;