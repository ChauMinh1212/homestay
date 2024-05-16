import { useEffect } from "react";
import NotFound from "~/components/NotFound/NotFound"

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <NotFound></NotFound>
        </>
    )
}

export default ContactPage