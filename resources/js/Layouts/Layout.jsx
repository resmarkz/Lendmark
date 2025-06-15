import Navbar from "@/Components/Navbar";

function Layout({ children }) {
    return (
        <>
            <Navbar />

            <main>{children}</main>
        </>
    );
}

export default Layout;
