import { type PropsWithChildren } from "react"
import Header from "./header"

const MainLayout = ({children}: PropsWithChildren) => {
    return (
        <>
        <Header />
        <main className="">
            {children}
        </main>
        </>
    )
}

export default MainLayout