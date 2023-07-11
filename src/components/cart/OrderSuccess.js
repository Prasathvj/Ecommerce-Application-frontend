export default function OrderSuccess() {
    return (
        <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto order-success" 
                src="https://cdn.dribbble.com/users/4358240/screenshots/14825308/media/84f51703b2bfc69f7e8bb066897e26e0.gif" 
                alt="Order Success" width="300" height="300" />

                
            </div>
            <div>
            <h1>Your Order has been placed successfully.</h1>
            <a href="/orders">Go to Orders</a>
            </div>

        </div>
    )
}