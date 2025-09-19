"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  // State for donation form
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("1000");
  const [message, setMessage] = useState("");

  const amounts = [500, 1000, 2500, 5000];

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
    setMessage("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);

    if (!amounts.includes(Number(value))) {
      setSelectedAmount(null);
    }
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(customAmount);
    if (amount && !isNaN(amount) && amount > 0) {
      setMessage(`Thank you for your generous donation of ₹${amount}!`);
      setCustomAmount("");
      setSelectedAmount(null);
    } else {
      setMessage("Please enter a valid amount.");
    }
  };

  const donors = [
    {
      name: "Priya Sharma",
      amount: 10000,
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      status: "green",
    },
    {
      name: "Arjun Singh",
      amount: 7500,
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      status: "orange",
    },
    {
      name: "Meera Patel",
      amount: 5000,
      img: "https://randomuser.me/api/portraits/women/64.jpg",
      status: "white",
    },
    {
      name: "Karthik Rao",
      amount: 4000,
      img: "https://randomuser.me/api/portraits/men/67.jpg",
      status: "green",
    },
  ];

  const statusColor = {
    green: "bg-green-500",
    orange: "bg-orange-500",
    white: "bg-white border-gray-300",
  };

  return (
    <div className="bg-[#d6d3b4] font-['Segoe_UI',_Arial,_sans-serif]">
      <div className="relative min-h-screen">
        {/* Background with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        </div>

        {/* Foreground content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="py-6 px-8">

          </div>

          <main>
            {/* Donation form section */}
            <div className="max-w-6xl mx-auto my-8 p-4 md:p-8 flex flex-col lg:flex-row rounded-xl gap-8 items-center">
              <div className="hidden lg:flex items-center justify-center lg:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&q=80"
                    alt="Community and Support"
                    width={600}
                    height={740}
                    className="w-full h-auto max-h-[740px] object-cover transform hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center w-full lg:w-1/2">
                <div className="bg-[#837F69]/80 backdrop-blur-sm rounded-xl p-8 md:p-11 shadow-2xl flex flex-col justify-center w-full transform hover:scale-[1.01] transition-transform duration-300">
                  <h1 className="text-white text-3xl md:text-4xl font-bold mb-5">
                    Support Alumni Initiatives!
                  </h1>
                  <p className="text-gray-200 text-lg mb-9 leading-relaxed">
                    Your contribution helps fund scholarships, community
                    projects, and networking events that empower our alumni.
                    Every donation makes a significant impact.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {amounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleAmountClick(amount)}
                          className={`text-white p-4 text-lg rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                            selectedAmount === amount
                              ? "bg-[#36c1f2] shadow-lg"
                              : "bg-[#222f3e] hover:bg-[#34495e]"
                          }`}
                        >
                          ₹{amount.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>

                    <label
                      htmlFor="customAmount"
                      className="text-gray-100 font-medium text-base mb-2 block ml-1"
                    >
                      Or Enter a Custom Amount (₹)
                    </label>
                    <input
                      type="number"
                      id="customAmount"
                      name="customAmount"
                      placeholder="e.g., 5000"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full rounded-md border-2 border-transparent text-gray-200 bg-black/50 p-3 text-base mb-6 box-border focus:outline-none focus:ring-2 focus:ring-[#36c1f2] focus:border-transparent transition-all"
                    />

                    <button
                      type="submit"
                      className="w-full bg-[#36c1f2] text-white p-4 rounded-lg text-xl font-semibold cursor-pointer transition-all duration-300 hover:bg-[#2aa8d0] hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Donate Now
                    </button>

                    {message && (
                      <p className="text-white text-center mt-4 text-lg bg-black/30 p-3 rounded-lg">
                        {message}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>

            {/* Impact Section */}
            <section className="py-12">
              <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
                <h2 className="text-white text-4xl font-bold text-center mb-3">
                  Alumni Impact
                </h2>

                <div className="flex items-center gap-4 mb-4 bg-black/20 p-4 rounded-xl">
                  <Image
                    src="https://www.freeiconspng.com/uploads/trophy-png-23.png"
                    alt="Trophy Icon"
                    width={24}
                    height={34}
                    className="filter brightness-0 invert"
                  />
                  <span className="text-4xl font-bold text-white">
                    ₹1,25,000
                  </span>
                </div>

                <h3 className="text-white text-3xl font-bold mt-8 mb-8 text-center">
                  Our Top Donors
                </h3>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-8 mb-9">
                  {donors.map((donor) => (
                    <div
                      key={donor.name}
                      className="bg-[#222936]/80 backdrop-blur-sm rounded-2xl w-full sm:w-56 text-white flex flex-col items-center p-5 pt-7 shadow-lg relative transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="relative w-[74px] h-[74px] mb-3">
                        <Image
                          src={donor.img}
                          alt={donor.name}
                          width={74}
                          height={74}
                          className="w-full h-full rounded-full object-cover border-2 border-[#ada679]"
                        />
                        <span
                          className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[#222936] ${statusColor[donor.status]}`}
                        ></span>
                      </div>
                      <div className="text-lg font-medium text-center">
                        {donor.name}
                      </div>
                      <div className="text-gray-400 text-base">
                        ₹{donor.amount.toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
