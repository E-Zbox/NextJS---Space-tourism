import Link from "next/link"
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// data
const data = [
    {count: "OO", title: "HOME", href:"/", selected: true},
    {count: "O1", title: "DESTINATION", href:"/destination", selected: false},
    {count: "O2", title: "CREW", href:"/crew", selected: false},
    {count: "O3", title: "TECHNOLOGY", href:"/technology", selected: false}
]

const Item = ({clickHandler, count, title, href, selected}) => {
    const [classname, setClassname] = useState('item-link-selected')

    useEffect(()=> {
        selected ? setClassname('item-link item-link-selected'):setClassname('item-link')
    }, [selected])

    return (
        <Link href={href}>
            <div className={classname} onClick={clickHandler}>
                <span>{count}</span>
                <span>{title}</span>
            </div>
        </Link>
    )
}


const Navbar = () => {
    const {pathname} = useRouter()

    const [defaultState, setDefaultState] = useState(data.map((item,index)=> (
        item.href == pathname ? {...item, selected:true} : {...item, selected:false}
    )))
    
    var logoSize = "40px";

    const handleClick = (id)=> {
        setDefaultState(defaultState.map((item,index)=> (
            id == index ? {...item, selected:true}:{...item, selected:false}
        )))
    }

    function handleMenuButton({target}) {
        const menuButton = document.querySelector("div.navbarContainer .contents #menu-button")
        const ul = document.querySelector("div.navbarContainer div.contents ul")
        if(menuButton.classList.contains('x-button')) {
            menuButton.classList.remove('x-button')
            ul.classList.add('hide-list')
            
        } else {
            menuButton.classList += 'x-button'
            ul.classList.remove('hide-list')
        }
    }

    return (
        <div className="navbarContainer">
            <div className="contents">
                <Image className="logo"
                    width={logoSize}
                    height={logoSize}
                    src="/shared/logo.svg"
                    alt="logo.svg"
                />
                <div id="menu-button" className="" onClick={(e)=> handleMenuButton(e)}>
                    <div className="first"></div>
                    <div id="second"></div>
                    <div className="third"></div>
                </div>
                <ul className="hide-list">
                    {
                        defaultState.map(({count, title, href, selected},index)=> 
                            <Item 
                                key={index} 
                                clickHandler={()=> handleClick(index)}
                                count={count} 
                                title={title} 
                                href={href} 
                                selected={selected}
                            />
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar