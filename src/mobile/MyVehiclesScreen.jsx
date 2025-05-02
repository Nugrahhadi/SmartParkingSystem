import React, { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Car,
  MoreVertical,
  Check,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyVehiclesScreen = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: "Honda Civic",
      licensePlate: "B 1234 XYZ",
      type: "Sedan",
      color: "Black",
      isDefault: true,
    },
    {
      id: 2,
      name: "Toyota Innova",
      licensePlate: "B 5678 ABC",
      type: "MPV",
      color: "Silver",
      isDefault: false,
    },
  ]);
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    licensePlate: "",
    type: "Sedan",
    color: "Black",
    isDefault: false,
  });

  // Handler functions
  const goBack = () => {
    navigate(-1);
  };

  const handleAddVehicle = () => {
    setShowAddForm(true);
    setNewVehicle({
      name: "",
      licensePlate: "",
      type: "Sedan",
      color: "Black",
      isDefault: false,
    });
  };

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setNewVehicle({ ...vehicle });
    setShowEditForm(true);
  };

  const handleDeleteVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteVehicle = () => {
    setVehicles(vehicles.filter((v) => v.id !== selectedVehicle.id));
    setShowDeleteConfirm(false);
  };

  const handleSaveNewVehicle = () => {
    const vehicleToAdd = {
      ...newVehicle,
      id: vehicles.length + 1,
    };

    // If new vehicle is set as default, update other vehicles
    if (vehicleToAdd.isDefault) {
      setVehicles(
        vehicles.map((v) => ({
          ...v,
          isDefault: false,
        }))
      );
    }

    setVehicles([...vehicles, vehicleToAdd]);
    setShowAddForm(false);
  };

  const handleUpdateVehicle = () => {
    // If edited vehicle is set as default, update other vehicles
    if (newVehicle.isDefault && !selectedVehicle.isDefault) {
      setVehicles(
        vehicles.map((v) => ({
          ...v,
          isDefault: v.id === selectedVehicle.id ? true : false,
        }))
      );
    } else {
      setVehicles(
        vehicles.map((v) =>
          v.id === selectedVehicle.id ? { ...newVehicle } : v
        )
      );
    }
    setShowEditForm(false);
  };

  const handleSetDefault = (vehicle) => {
    setVehicles(
      vehicles.map((v) => ({
        ...v,
        isDefault: v.id === vehicle.id,
      }))
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center"
          onClick={goBack}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-4">My Vehicles</h1>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 overflow-auto">
        {vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Car size={64} className="text-blue-300 mb-4" />
            <p className="text-gray-500 mb-4">You haven't added any vehicles yet</p>
            <button
              onClick={handleAddVehicle}
              className="px-6 py-2 bg-blue-600 text-white rounded-md flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add Vehicle
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Your Vehicles ({vehicles.length})
              </h2>
              <button
                onClick={handleAddVehicle}
                className="p-2 bg-blue-600 text-white rounded-full"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Vehicles List */}
            <div className="space-y-3">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-lg p-4 shadow-sm relative"
                >
                  {vehicle.isDefault && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Default
                    </div>
                  )}
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Car size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-800">{vehicle.name}</h3>
                      <p className="text-gray-600 text-sm font-medium">
                        {vehicle.licensePlate}
                      </p>
                      <div className="flex mt-1 text-xs text-gray-500">
                        <span className="mr-3">{vehicle.type}</span>
                        <span>{vehicle.color}</span>
                      </div>
                    </div>
                    <div className="dropdown relative">
                      <button className="p-1">
                        <MoreVertical size={20} className="text-gray-500" />
                      </button>
                      <div className="dropdown-content absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 hidden group-hover:block">
                        {!vehicle.isDefault && (
                          <button
                            onClick={() => handleSetDefault(vehicle)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                          >
                            <Check size={16} className="mr-2 text-blue-600" />
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleEditVehicle(vehicle)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                        >
                          <Edit2 size={16} className="mr-2 text-blue-600" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteVehicle(vehicle)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center text-red-600"
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  {!vehicle.isDefault && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleSetDefault(vehicle)}
                        className="text-blue-600 text-sm font-medium"
                      >
                        Set as Default Vehicle
                      </button>
                    </div>
                  )}
                  <div className="flex mt-3 pt-3 border-t border-gray-100 space-x-2">
                    <button
                      onClick={() => handleEditVehicle(vehicle)}
                      className="flex-1 py-1.5 border border-blue-600 text-blue-600 rounded text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle)}
                      className="flex-1 py-1.5 border border-red-500 text-red-500 rounded text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add Vehicle Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold">Add New Vehicle</h2>
              <button onClick={() => setShowAddForm(false)}>
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Honda Civic"
                  value={newVehicle.name}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  License Plate
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="e.g. B 1234 XYZ"
                  value={newVehicle.licensePlate}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      licensePlate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Vehicle Type
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={newVehicle.type}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, type: e.target.value })
                    }
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="MPV">MPV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Truck">Truck</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Color
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={newVehicle.color}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, color: e.target.value })
                    }
                  >
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Silver">Silver</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={newVehicle.isDefault}
                    onChange={(e) =>
                      setNewVehicle({
                        ...newVehicle,
                        isDefault: e.target.checked,
                      })
                    }
                  />
                  <span className="ml-2 text-gray-700">
                    Set as default vehicle
                  </span>
                </label>
              </div>
            </div>
            <div className="flex p-4 border-t border-gray-200">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 border border-gray-300 rounded-md mr-2 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewVehicle}
                className="flex-1 py-2 bg-blue-600 text-white rounded-md font-medium"
                disabled={!newVehicle.name || !newVehicle.licensePlate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Vehicle Form */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold">Edit Vehicle</h2>
              <button onClick={() => setShowEditForm(false)}>
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Honda Civic"
                  value={newVehicle.name}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  License Plate
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="e.g. B 1234 XYZ"
                  value={newVehicle.licensePlate}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      licensePlate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Vehicle Type
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={newVehicle.type}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, type: e.target.value })
                    }
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="MPV">MPV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Truck">Truck</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Color
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={newVehicle.color}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, color: e.target.value })
                    }
                  >
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Silver">Silver</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={newVehicle.isDefault}
                    onChange={(e) =>
                      setNewVehicle({
                        ...newVehicle,
                        isDefault: e.target.checked,
                      })
                    }
                  />
                  <span className="ml-2 text-gray-700">
                    Set as default vehicle
                  </span>
                </label>
              </div>
            </div>
            <div className="flex p-4 border-t border-gray-200">
              <button
                onClick={() => setShowEditForm(false)}
                className="flex-1 py-2 border border-gray-300 rounded-md mr-2 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateVehicle}
                className="flex-1 py-2 bg-blue-600 text-white rounded-md font-medium"
                disabled={!newVehicle.name || !newVehicle.licensePlate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-4">
            <h2 className="text-lg font-bold mb-2">Delete Vehicle</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete {selectedVehicle.name} (
              {selectedVehicle.licensePlate})? This action cannot be undone.
            </p>
            <div className="flex">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 border border-gray-300 rounded-md mr-2 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteVehicle}
                className="flex-1 py-2 bg-red-600 text-white rounded-md font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyVehiclesScreen;