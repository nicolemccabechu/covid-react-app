import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'

const FetchData = () => {
  const [countries, setCountries] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.covid19api.com/summary')
      setCountries(response.data.Countries)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <section className="bg-gray-900 grid grid-cols-1 gap-10 px-10 py-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:px-20">
        {countries.map((country) => {
          const {
            ID,
            Country,
            CountryCode,
            NewConfirmed,
            TotalConfirmed,
            NewDeaths,
            TotalDeaths,
            NewRecovered,
            TotalRecovered,
            Date,
          } = country

          return (
            <div key={ID} className="bg-gray-800 p-4 rounded">
              <h2 className="font-bold text-pink-400 text-3xl mb-4">
                {Country}, <span className="font-light">{CountryCode}</span>
              </h2>

              <ul>
                <li className="flex justify-between my-2 text-pink-300">
                  <span className="font-bold">New Confirmed Cases:</span>{' '}
                  {NewConfirmed}
                </li>
                <li className="flex justify-between my-2 text-pink-300">
                  <span className="font-bold">Total Confirmed Cases:</span>{' '}
                  {TotalConfirmed}
                </li>
                <li className="flex justify-between my-2 text-purple-300">
                  <span className="font-bold">New Deaths:</span> {NewDeaths}
                </li>
                <li className="flex justify-between my-2 text-purple-300">
                  <span className="font-bold">Total Deaths:</span> {TotalDeaths}
                </li>
                <li className="flex justify-between my-2 text-yellow-300">
                  <span className="font-bold">New Recovered Cases:</span>{' '}
                  {NewRecovered}
                </li>
                <li className="flex justify-between my-2 text-yellow-300">
                  <span className="font-bold">Total Recovered Cases:</span>{' '}
                  {TotalRecovered}
                </li>
                <li className="text-pink-100 mt-5">
                  <span className="font-bold">Date:</span>{' '}
                  {moment(`${Date}`).format('MMMM Do YYYY hh:mm:ss')}
                </li>
              </ul>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default FetchData