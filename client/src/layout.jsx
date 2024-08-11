import Header from './component/Header'
import { Outlet } from 'react-router'

export default function Layout(){
    return(
        <div className='flex flex-col min-h-screen py-4 px-8'>
        <Header />
        <Outlet />
        </div>
    )
}