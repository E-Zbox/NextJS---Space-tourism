import React from "react";
import Link from "next/link";

const Home = () => {
    return (
        <div className="homeContainer">
            <main>
                <div className="container">
                    <div className="text">
                        <p>So, you want to travel to</p>
                        <h3>Space</h3>
                        <p className="small-text">
                            Let&apos;s face it; if you want to go to space, you
                            might as well genuinely go to outer space and not
                            hover kind of on the edge of it. Well sit back, and
                            relax because we&apos;ll give you a truly out of
                            this world experience!
                        </p>
                    </div>
                    <div className="explore-image">
                        <Link href="/destination" passHref>
                            <h3>Explore</h3>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
