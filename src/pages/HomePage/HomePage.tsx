import { useEffect } from "react";
import About from "~/components/About/About"
import Service from "~/components/Service/Service"

const HomePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <About></About>
            <Service></Service>
        </>
    )
}

export default HomePage