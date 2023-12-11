import { type PropsWithChildren } from 'react'
import Header from './header'

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-screen w-screen flex-col'>
      <Header />
      <section className='flex-grow'>{children}</section>
    </div>
  )
}

export default MainLayout
