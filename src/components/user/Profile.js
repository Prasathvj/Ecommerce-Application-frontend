import {useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UilShoppingBag } from '@iconscout/react-unicons'
import { UilKeySkeleton } from '@iconscout/react-unicons'

export default function Profile () {
    const { user }  = useSelector(state => state.authState);

    return (
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3 edit-profile-1">
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid" src={user.avatar??'./images/default_avatar.png'} alt='' />
                </figure>
                <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                    Edit Profile
                </Link>
            </div>
    
            <div className="col-12 col-md-5 edit-profile-1">
                <h4>Full Name</h4>
                <p>{user.name}</p>
    
                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Joined</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>

                <Link to="/orders" className="btn  btn-block mt-5 my-orders-btn"><UilShoppingBag/>
                    My Orders
                </Link>

                <Link to="/myprofile/update/password" className="btn  btn-block mt-3 my-orders-btn-1"><UilKeySkeleton/>
                    Change Password
                </Link>
            </div>
        </div>
    )
}