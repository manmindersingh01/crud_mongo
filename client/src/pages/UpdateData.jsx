import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import url from '../axiosConfig';
const UpdateData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    url.get(`/get/${id}`)
      .then(res => {
        setFormData(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the card details!', error);
        setIsLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    url.put(`/update/${id}`, formData)
      .then(res => {
        console.log('Data updated successfully!', res.data);
        navigate('/users');
      })
      .catch(err => {
        console.error('Error updating data:', err);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="p-8 bg-white rounded-lg shadow-lg">
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
              pattern="\d*"
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
                pattern="\d*"
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
                pattern="\d*"
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
              pattern="\d*"
              maxLength="3"
            />
          </div>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateData;
