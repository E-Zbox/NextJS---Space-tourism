import React, { Component, useEffect, useState } from "react";
import Image from "next/image";
// data
import data from "../../pages/api/data";

const Item = ({ title, clickHandler, selected }) => {
    const [classname, setClassname] = useState("item-link");

    useEffect(() => {
        if (selected) {
            setClassname("item-link item-link-selected");
        } else {
            setClassname("item-link");
        }
    }, [selected]);
    return (
        <div onClick={clickHandler} className={classname}>
            <span></span>
            <span>{title}</span>
        </div>
    );
};

class Destination extends Component {
    constructor() {
        super();
        this.state = {
            apiData: data.destinations.map((item, index) => {
                if (index == 0) {
                    return { ...item, selected: true };
                }
                return { ...item, selected: false };
            }),
            displayItem: data.destinations[0],
            imageWidth: "350px",
        };
    }

    handleClick = (e, index) => {
        console.log(e.target);
        const [newItem] = this.state.apiData.filter((item, id) => id == index);
        this.setState({ displayItem: newItem });

        const newApiData = this.state.apiData.map((item, id) => {
            if (id == index) {
                return {
                    ...item,
                    selected: true,
                };
            }
            return { ...item, selected: false };
        });

        this.setState({ apiData: newApiData });
        console.log(this.state.apiData);
    };

    componentDidMount() {
        if (window.innerWidth > 1024) {
            this.setState({ imageWidth: "350px" });
        } else if ((window.innerWidth >= 760) & (window.innerWidth <= 1024)) {
            this.setState({ imageWidth: "300px" });
        } else {
            this.setState({ imageWidth: "200px" });
        }
    }

    render() {
        return (
            <>
                <div className="destinationContainer">
                    <div className="contents">
                        <div className="title">
                            <p className="count">01</p>
                            <h3>Pick your destination</h3>
                        </div>
                        <div className="planets">
                            <div className="menu">
                                <ul>
                                    {this.state.apiData.map((item, index) => (
                                        <Item
                                            selected={item.selected}
                                            key={index}
                                            title={item.name}
                                            clickHandler={(e) =>
                                                this.handleClick(e, index)
                                            }
                                        />
                                    ))}
                                </ul>
                            </div>
                            <main>
                                <div className="image">
                                    <Image
                                        width={this.state.imageWidth}
                                        height={this.state.imageWidth}
                                        src={this.state.displayItem.images.png}
                                        alt={this.state.displayItem.images.png}
                                    />
                                </div>
                                <div className="text">
                                    <div className="title">
                                        <h3>{this.state.displayItem.name}</h3>
                                    </div>
                                    <div className="about">
                                        <p>
                                            {this.state.displayItem.description}
                                        </p>
                                    </div>
                                    <div className="more-info">
                                        <div>
                                            <div className="title">
                                                AVG. DISTANCE
                                            </div>
                                            <div className="description">
                                                {
                                                    this.state.displayItem
                                                        .distance
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <div className="title">
                                                EST. TRAVEL TIME
                                            </div>
                                            <div className="description">
                                                {this.state.displayItem.travel}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
/*
const Destination = () => {
    const [apiData, setApiData] = useState(
        data.destinations.map((item, index) => {
            if (index == 0) {
                return { ...item, selected: true };
            }
            return { ...item, selected: false };
        })
    );
    const [displayItem, setDisplayItem] = useState(data.destinations[0]);

    const handleClick = (e, index) => {
        console.log(e.target);
        const [newItem] = apiData.filter((item, id) => id == index);
        setDisplayItem(newItem);

        const newApiData = apiData.map((item, id) => {
            if (id == index) {
                return {
                    ...item,
                    selected: true,
                };
            }
            return { ...item, selected: false };
        });

        setApiData(newApiData);
        console.log(apiData);
    };

    var imageWidth = "350px";
    useEffect(() => {
        if (window.innerWidth > 1024) {
            imageWidth = "350px";
        } else if ((window.innerWidth >= 760) & (window.innerWidth <= 1024)) {
            imageWidth = "300px";
        } else {
            imageWidth = "200px";
        }
    });

    return (
        <>
            <div className="destinationContainer">
                <div className="contents">
                    <div className="title">
                        <p className="count">01</p>
                        <h3>Pick your destination</h3>
                    </div>
                    <div className="planets">
                        <div className="menu">
                            <ul>
                                {apiData.map((item, index) => (
                                    <Item
                                        selected={item.selected}
                                        key={index}
                                        title={item.name}
                                        clickHandler={(e) =>
                                            handleClick(e, index)
                                        }
                                    />
                                ))}
                            </ul>
                        </div>
                        <main>
                            <div className="image">
                                <Image
                                    width={imageWidth}
                                    height={imageWidth}
                                    src={displayItem.images.png}
                                    alt={displayItem.images.png}
                                />
                            </div>
                            <div className="text">
                                <div className="title">
                                    <h3>{displayItem.name}</h3>
                                </div>
                                <div className="about">
                                    <p>{displayItem.description}</p>
                                </div>
                                <div className="more-info">
                                    <div>
                                        <div className="title">
                                            AVG. DISTANCE
                                        </div>
                                        <div className="description">
                                            {displayItem.distance}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="title">
                                            EST. TRAVEL TIME
                                        </div>
                                        <div className="description">
                                            {displayItem.travel}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};
*/
export default Destination;
