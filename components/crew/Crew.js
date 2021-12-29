import React, { Component, useEffect, useState } from "react";
import Image from "next/image";
// data
import data from "../../pages/api/data";

const Navigator = ({ clickHandler, selected }) => {
    const [classname, setClassname] = useState("navigator");

    useEffect(() => {
        if (selected) {
            return setClassname("navigator navigator-selected");
        }
        return setClassname("navigator");
    }, [selected]);

    return <div className={classname} onClick={clickHandler}></div>;
};

class Crew extends Component {
    constructor() {
        super();
        this.state = {
            apiData: data.crew.map((item, index) => {
                if (index == 0) {
                    return { ...item, selected: true };
                }
                return { ...item, selected: false };
            }),
        };
    }

    handleClick = (id) => {
        console.log(id);
        const container = document.querySelector(
            "div.crewContainer div.container"
        );
        const content = document.querySelector(
            "div.crewContainer div.contents div.content"
        );
        const scrollXBy = content.clientWidth * id;
        container.scrollLeft = scrollXBy;
        console.log(scrollXBy);

        this.setState((prevState) => ({
            apiData: prevState.apiData.map((item, index) => {
                if (index == id) {
                    return { ...item, selected: true };
                }
                return { ...item, selected: false };
            }),
        }));
    };
    render() {
        return (
            <div className="crewContainer">
                <div className="title">
                    <p className="count">02</p>
                    <h3>Meet your Crew</h3>
                </div>
                <div className="container">
                    <div className="contents">
                        {this.state.apiData.map((item, index) => (
                            <div key={index} className="content">
                                <div className="text">
                                    <h3 className="role">{item.role}</h3>
                                    <h1 className="name">{item.name}</h1>
                                    <p className="about">{item.bio}</p>
                                </div>
                                <div className="image">
                                    <Image
                                        priority={true}
                                        width={350}
                                        height={350}
                                        src={item.images.png}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="navigator-menu">
                    {this.state.apiData.map((item, index) => (
                        <Navigator
                            key={index}
                            clickHandler={() => this.handleClick(index)}
                            selected={item.selected}
                        />
                    ))}
                </div>
            </div>
        );
    }
    componentDidMount() {
        if (window.innerWidth > 1024) {
            const navigatorMenu = document.querySelector(
                "div.crewContainer div.navigator-menu"
            );
            const container = document.querySelector(
                "div.crewContainer div.container"
            );
            navigatorMenu.style.top = `${
                container.getBoundingClientRect().y + container.clientHeight + 5
            }px`;
        }
    }
}
/*
const Crew = () => {
    const [apiData, setApiData] = useState(
        data.crew.map((item, index) => {
            if (index == 0) {
                return { ...item, selected: true };
            }
            return { ...item, selected: false };
        })
    );

    const handleClick = (id) => {
        console.log(id);
        const container = document.querySelector(
            "div.crewContainer div.container"
        );
        const content = document.querySelector(
            "div.crewContainer div.contents div.content"
        );
        const scrollXBy = content.clientWidth * id;
        container.scrollLeft = scrollXBy;
        console.log(scrollXBy);

        setApiData(
            apiData.map((item, index) => {
                if (index == id) {
                    return { ...item, selected: true };
                }
                return { ...item, selected: false };
            })
        );
    };

    return (
        <div className="crewContainer">
            <div className="container">
                <div className="title">
                    <p className="count">02</p>
                    <h3>Meet your Crew</h3>
                </div>
                <div className="contents">
                    {apiData.map((item, index) => (
                        <div key={index} className="content">
                            <div className="text">
                                <h3 className="role">{item.role}</h3>
                                <h1 className="name">{item.name}</h1>
                                <p className="about">{item.bio}</p>
                            </div>
                            <div className="image">
                                <Image
                                    priority={true}
                                    width={350}
                                    height={350}
                                    src={item.images.png}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="navigator-menu">
                {apiData.map((item, index) => (
                    <Navigator
                        key={index}
                        clickHandler={() => handleClick(index)}
                        selected={item.selected}
                    />
                ))}
            </div>
        </div>
    );
};
*/
export default Crew;
