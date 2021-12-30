import React, { Component, useEffect, useState } from "react";
import Image from "next/image";
// data
import data from "../../pages/api/data";

const Counter = ({ clickHandler, selected, title }) => {
    const [classname, setClassname] = useState("space-counter");

    useEffect(() => {
        selected
            ? setClassname("space-counter space-counter-selected")
            : setClassname("space-counter");
    }, [selected]);

    return (
        <div className={classname} onClick={clickHandler}>
            {title}
        </div>
    );
};

class Technology extends Component {
    constructor() {
        super();
        this.state = {
            apiData: data.technology.map((item, index) =>
                index == 0
                    ? { ...item, selected: true }
                    : { ...item, selected: false }
            ),
            image: {
                width: 400,
                height: 450,
                align: "center",
            },
            displayImage: data.technology[0].images.portrait,
            layoutGt760: true,
            layoutGt1024: true,
        };
    }
    handleClick = (id) => {
        const contentsDiv = document.querySelector(
            "div.technologyContainer div.container div.main-contents main#text div#contents"
        );
        const contentDiv = document.querySelector(
            "div.technologyContainer div.container div.main-contents main#text div#contents section.contents div.content"
        );

        contentsDiv.scrollTop = contentDiv.clientHeight * id;

        this.setState({
            apiData: this.state.apiData.map((item, index) =>
                id == index
                    ? { ...item, selected: true }
                    : { ...item, selected: false }
            ),
        });

        const [{ images }] = this.state.apiData.filter(({ images }, index) => {
            if (id === index) {
                return images;
            }
        });
        if (this.state.layoutGt1024) {
            this.setState({ displayImage: images.portrait });
        } else if (!this.state.layoutGt1024 && this.state.layoutGt760) {
            this.setState({ displayImage: images.landscape });
        } else if (!this.state.layoutGt1024 && !this.state.layoutGt760) {
            this.setState({ displayImage: images.landscape });
        }
    };

    componentDidMount() {
        if (window.innerWidth > 1024) {
            this.setState({ layoutGt1024: true });
            this.setState({ layoutGt760: true });
            this.setState({ displayImage: data.technology[0].images.portrait });
        } else if (window.innerWidth >= 760 && window.innerWidth <= 1024) {
            this.setState({ layoutGt1024: false });
            this.setState({ layoutGt760: true });
            this.setState({
                displayImage: data.technology[0].images.landscape,
            });
        } else if (window.innerWidth < 760) {
            this.setState({ layoutGt1024: false });
            this.setState({ layoutGt760: false });
            this.setState({
                displayImage: data.technology[0].images.landscape,
            });
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className="technologyContainer">
                <div className="container">
                    <div className="title">
                        <p className="count">03</p>
                        <h3>Space Launch 101</h3>
                    </div>
                    <div className="main-contents">
                        <main id="counters">
                            {this.state.apiData.map((item, index) => (
                                <Counter
                                    clickHandler={() => this.handleClick(index)}
                                    key={index}
                                    title={index + 1}
                                    selected={item.selected}
                                />
                            ))}
                        </main>
                        <main id="text">
                            <div className="title">
                                <p>The Terminology...</p>
                            </div>
                            <div id="contents">
                                <section className="contents">
                                    {this.state.apiData.map((item, index) => (
                                        <div key={index} className="content">
                                            <div className="title">
                                                <h3>{item.name}</h3>
                                            </div>
                                            <div className="about">
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            </div>
                        </main>
                        <main id="image">
                            <Image
                                align={this.state.image.align}
                                layout="fill"
                                src={this.state.displayImage}
                                alt={this.state.displayImage}
                            />
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

/*
const Technology = () => {
    const [apiData, setApiData] = useState(
        data.technology.map((item, index) =>
            index == 0
                ? { ...item, selected: true }
                : { ...item, selected: false }
        )
    );

    const [displayImage, setDisplayImage] = useState(
        apiData[0].images.portrait
    );

    const handleClick = (id) => {
        const contentsDiv = document.querySelector(
            "div.technologyContainer div.container div.main-contents main#text div#contents"
        );
        const contentDiv = document.querySelector(
            "div.technologyContainer div.container div.main-contents main#text div#contents section.contents div.content"
        );

        contentsDiv.scrollTop = contentDiv.clientHeight * id;

        setApiData(
            apiData.map((item, index) =>
                id == index
                    ? { ...item, selected: true }
                    : { ...item, selected: false }
            )
        );

        const [{ images }] = apiData.filter(({ images }, index) => {
            console.log(images.portrait);
            if (id === index) {
                console.log("found it", index);
                return images.portrait;
            }
        });
        setDisplayImage(images.portrait);
    };

    return (
        <div className="technologyContainer">
            <div className="container">
                <div className="title">
                    <p className="count">03</p>
                    <h3>Space Launch 101</h3>
                </div>
                <div className="main-contents">
                    <main id="counters">
                        {apiData.map((item, index) => (
                            <Counter
                                clickHandler={() => handleClick(index)}
                                key={index}
                                title={index + 1}
                                selected={item.selected}
                            />
                        ))}
                    </main>
                    <main id="text">
                        <div className="title">
                            <p>The Terminology...</p>
                        </div>
                        <div id="contents">
                            <section className="contents">
                                {apiData.map((item, index) => (
                                    <div key={index} className="content">
                                        <div className="title">
                                            <h3>{item.name}</h3>
                                        </div>
                                        <div className="about">
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        </div>
                    </main>
                    <main id="image">
                        <Image width={400} height={450} src={displayImage} />
                    </main>
                </div>
            </div>
        </div>
    );
};
*/
export default Technology;
