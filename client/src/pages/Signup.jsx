import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import grD from '../assets/bg-main-desktop.png'
import grM from '../assets/bg-main-mobile.png'
import cdF from '../assets/bg-card-front.png'
import cdB from '../assets/bg-card-back.png'
import url from '../axiosConfig';
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    url.post('/submit', formData)
      .then(response => {
        navigate('/success')
        console.log('Data submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
  };

  return (
    <div className=' flex flex-col w-full h-screen md:flex md:flex-row '>
      <div className='h-screen w-[30%] bg-[url("../assets/bg-main-desktop.png")] '>
        <img src={grD} alt="" className=' min-h-screen' />
        <img src={cdF} alt="" className=' absolute left-20 top-40' />
        <img src={cdB} alt="" className=' absolute left-44 top-[430px]' />

      </div>
      <div className=' bg-white h-screen w-[70%]'>
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="p-8 bg-white rounded-lg ">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
                  Cardholder Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="cardNumber">
                  Card Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cardNumber"
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required

                  maxLength="16"
                />
              </div>
              <div className="flex mb-4">
                <div className="mr-2">
                  <label className="block text-sm font-bold mb-2" htmlFor="expMonth">
                    Exp. Month (MM)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="expMonth"
                    type="text"
                    name="expMonth"
                    value={formData.expMonth}
                    onChange={handleChange}
                    required

                    maxLength="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" htmlFor="expYear">
                    Exp. Year (YY)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="expYear"
                    type="text"
                    name="expYear"
                    value={formData.expYear}
                    onChange={handleChange}
                    required

                    maxLength="2"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="cvc">
                  CVC
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cvc"
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  required

                  maxLength="3"
                />
              </div>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Signup;
