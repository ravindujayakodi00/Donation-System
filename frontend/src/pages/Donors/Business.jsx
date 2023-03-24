import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';

//import images
import Image1 from '../../assets/reqImage.png';



const BusinessDetails = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleNext = () => {
        const data = {
            name,
            email,
            phoneNumber,
            address
        }

        console.log(data);


    }

    return (
      <div>
        <div className='top-section'>

        </div>

        <div className='content mt-12 flex'>
            {/* left side */}
            <div className='leftside w-1/2 p-32 mt-8'>
                <h1 className='text-6xl sidetext'>Tell us About Your Business, <h2 className='mt-2 text-gray-600'> So We Can Promote Your Business on Our Community</h2></h1>
            </div>

            {/* right side */}
            <div className='rightside w-1/2 mt-14'>
            <form  className='flex flex-col gap-3 mr-20 mt-10'>
                        
                        <label className='ml-2 '>Organization Name</label>
                        <input
                            className='p-2 rounded-xl border mt-0'
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder='Ex: ABC Company'
                        />

                        <label className='ml-2 '>Email</label>
                        <input 
                            className='p-2 rounded-xl border '
                            type="text" 
                            value={email} 
                            placeholder='Ex: abcd@gmail.com'
                            onChange={(e) => setEmail(e.target.value)} 
                        />

                        <label className='ml-2 '>Phone</label>
                        <input 
                            className='p-2 rounded-xl border '
                            type="text" 
                            value={phone} 
                            placeholder='Ex: 0812345678'
                            onChange={(e) => setPhone(e.target.value)} 
                        />

                        <label className='ml-2 '>Address</label>
                        <input
                            className='p-2 rounded-xl border'
                            type="text"
                            value={address}
                            placeholder='Ex: 123, Colombo'
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <center className='mt-4'>   
                            <Link to="/donors/personal" className='btn btn-outline-dark w-28 mr-4'>Back</Link>                        
                            <Link to="/donors/selectitems" className='btn btn-outline-success w-28'>Continue</Link>
                        </center>
                        

                    </form>
            </div>

        </div>
       
      </div>
    )
};

export default BusinessDetails;