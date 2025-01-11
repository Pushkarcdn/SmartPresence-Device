/* eslint-disable react/no-unescaped-entities */

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <main className="min-h-[80vh] flex items-center justify-center py-8 lg:py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          {/* Image Section */}
          <div className="mb-6">
            <Image
              src="/images/notfound.png" // Replace with your image path
              alt="404 Not Found"
              width={600}
              height={600}
              className="mx-auto w-96"
            />
          </div>

          {/* Text and Buttons */}
          <div>
            <p className="text-xl font-semibold mb-4">
              Oops! Looks like you're lost...
            </p>

            <div className="space-x-4">
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-primary hover:bg-primaryDark transition text-white font-semibold rounded-full shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                Continue Taking Attendance
              </Link>
              <a
                href="https://www.linkedin.com/in/pushkarcdn/"
                className="inline-block px-6 py-3 text-primary border-2 border-primary font-semibold rounded-full hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
