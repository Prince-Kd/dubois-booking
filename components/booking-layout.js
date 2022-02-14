import BookingFooter from "./booking-footer";
import BookingHeader from "./booking-header";

export default function BookingLayout({ children }){
    return(
        <div className="h-screen overflow-hidden">
            <BookingHeader />
            {children}
            <BookingFooter />
        </div>
    )
}