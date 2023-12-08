import { type PropsWithChildren } from "react"
import Header from "./header"

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen max-h-screen flex flex-col">
      <Header />
      <section className="flex-1">
        {children}
      </section>
    </div>
  )
}

export default MainLayout