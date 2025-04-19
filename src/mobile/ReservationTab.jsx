import React from "react";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";

const ReservationsTab = () => {
  // Mock data for active and past reservations
  const activeReservations = [
    {
      id: 1,
      location: "Central Mall Parking",
      slot: "B-42",
      date: "Today",
      startTime: "13:00",
      endTime: "15:30",
      timeRemaining: "1:32:45",
      price: "10.000",
    },
  ];

  const upcomingReservations = [
    {
      id: 2,
      location: "City Plaza Parking",
      slot: "A-15",
      date: "Tomorrow",
      startTime: "10:00",
      endTime: "12:00",
      price: "14.000",
    },
  ];

  const pastReservations = [
    {
      id: 3,
      location: "Central Mall Parking",
      slot: "C-08",
      date: "Apr 18, 2025",
      startTime: "14:00",
      endTime: "16:00",
      price: "10.000",
      status: "completed",
    },
    {
      id: 4,
      location: "Station Parking",
      slot: "B-23",
      date: "Apr 15, 2025",
      startTime: "09:00",
      endTime: "11:00",
      price: "8.000",
      status: "completed",
    },
  ];

  return (
    <div className="flex flex-col h-full p-8">
      <h1 className="text-xl font-bold mb-4">My Reservations</h1>

      {/* Active Reservations Section */}
      {activeReservations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Active</h2>

          {activeReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white rounded-lg shadow-sm border-l-4 border-green-500 p-4 mb-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">
                    {reservation.location}
                  </h3>
                  <p className="text-gray-600">Slot {reservation.slot}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold">Active</p>
                  <p className="text-green-800 font-mono font-bold">
                    {reservation.timeRemaining}
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  <span>{reservation.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-1" />
                  <span>
                    {reservation.startTime} - {reservation.endTime}
                  </span>
                </div>
              </div>

              <div className="flex mt-3">
                <button className="flex-1 bg-blue-500 text-white py-2 rounded-l-md font-medium text-sm">
                  Extend Time
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-r-md font-medium text-sm">
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Reservations Section */}
      {upcomingReservations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Upcoming</h2>

          {upcomingReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white rounded-lg shadow-sm border-l-4 border-blue-500 p-4 mb-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">
                    {reservation.location}
                  </h3>
                  <p className="text-gray-600">Slot {reservation.slot}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 font-bold">Upcoming</p>
                  <p className="text-gray-700">Rp {reservation.price}</p>
                </div>
              </div>

              <div className="flex justify-between mt-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  <span>{reservation.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-1" />
                  <span>
                    {reservation.startTime} - {reservation.endTime}
                  </span>
                </div>
              </div>

              <div className="flex mt-3">
                <button className="flex-1 bg-white border border-red-500 text-red-600 py-2 rounded-l-md font-medium text-sm">
                  Cancel
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-r-md font-medium text-sm">
                  Modify
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Past Reservations Section */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Past</h2>

        {pastReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white rounded-lg shadow-sm p-4 mb-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">
                  {reservation.location}
                </h3>
                <p className="text-gray-600">Slot {reservation.slot}</p>
              </div>
              <div className="text-right">
                {reservation.status === "completed" ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle size={16} className="mr-1" />
                    <span>Completed</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <AlertCircle size={16} className="mr-1" />
                    <span>Cancelled</span>
                  </div>
                )}
                <p className="text-gray-700">Rp {reservation.price}</p>
              </div>
            </div>

            <div className="flex justify-between mt-3 text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-1" />
                <span>{reservation.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-1" />
                <span>
                  {reservation.startTime} - {reservation.endTime}
                </span>
              </div>
            </div>

            <button className="w-full mt-3 border border-gray-300 text-gray-700 py-2 rounded-md font-medium text-sm flex items-center justify-center">
              View Details
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationsTab;
