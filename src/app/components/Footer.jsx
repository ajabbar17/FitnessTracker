import React from 'react'
import Image from "next/image";
import Link from 'next/link';


const Footer = () => {
  return (


<footer className="bg-white">
    
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <div className="md:flex md:justify-between">
            
          <div className="mb-6 md:mb-0">
                 <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-black">FITNESS</span>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-black">about</h2>
                  <ul className="text-black dark:text-black font-medium">
                      <li className="mb-4">
                          <Link href="/" className="hover:underline">Contact Us</Link>
                      </li>
                      <li>
                          <Link href="/" className="hover:underline">Latest News</Link>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-black">Follow us</h2>
                  <ul className="text-black dark:text-black font-medium">
                      <li className="mb-4">
                          <Link href="/" className="hover:underline ">Instagram</Link>
                      </li>
                      <li>
                          <Link href="/" className="hover:underline">Facebook</Link>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-black">Legal</h2>
                  <ul className="text-black dark:text-black font-medium">
                      <li className="mb-4">
                          <Link href="#" className="hover:underline">Privacy Policy</Link>
                      </li>
                      <li>
                          <Link href="#" className="hover:underline">Terms &amp; Conditions</Link>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-center">
          <span className="text-sm text-black sm:text-center dark:text-black">© 2024 <Link href="h/" className="hover:underline">FITNESS™</Link>. All Rights Reserved.
          </span>
          
      </div>
    </div>
</footer>

 )
}

export default Footer
