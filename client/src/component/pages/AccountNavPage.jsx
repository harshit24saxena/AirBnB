import { Link, useLocation } from "react-router-dom";

export default function AccountNavPage(){

    function linkClasses(type=null){

        const {pathname} = useLocation();
        let subpage = pathname.split('/')?.[2];

        if(subpage === undefined){
            subpage = 'profile'
        }

        let classes = 'py-2 px-6 rounded-full';
        if(type === subpage ){
           classes +=" bg-primary text-white"
        }
        else{
           classes += ' bg-gray-200';
        }
        return classes;
   }

    return(
        <>
                 <nav className="w-full flex mt-4 gap-4 justify-center">
                <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
                <Link className={linkClasses('booking')}to={'/account/booking'}>My Booking</Link>
                <Link className={linkClasses('places')}to={'/account/places'}>My Accommodation</Link>
            </nav>
        </>
    )
}