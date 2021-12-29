// layout
import Layout from "../components/Layout";
import Navbar from "../components/home/Navbar";
// css
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Navbar />
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
