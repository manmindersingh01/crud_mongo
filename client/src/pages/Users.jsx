import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import url from '../axiosConfig';
const Users = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = (id) => {
    url.delete(`/cards/${id}`)
      .then(() => {
        setCards(cards.filter(card => card._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the card!', error);
      });
  };

  useEffect(() => {
    url.get('/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the cards!', error);
      });
  }, []); // Add an empty dependency array to ensure it runs only once

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Card Details</h2>
        {cards.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Cardholder Name</th>
                <th className="py-2">Card Number</th>
                <th className="py-2">Exp. Date</th>
                <th className="py-2">CVC</th>
                <th className='py-2'>update/delete</th>
              </tr>
            </thead>
            <tbody>
              {cards.map(card => (
                <tr key={card._id}>
                  <td className="border px-4 py-2">{card.name}</td>
                  <td className="border px-4 py-2">{card.cardNumber}</td>
                  <td className="border px-4 py-2">{card.expMonth}/{card.expYear}</td>
                  <td className="border px-4 py-2">{card.cvc}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => handleUpdate(card._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDelete(card._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No cards available.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
