// components/ShippingAddressForm.jsx
import React from "react";
import { MapPin } from "lucide-react";

export const ShippingAddressForm = ({ register, errors }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900">
          Shipping Address
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Street Address
          </label>
          <input
            type="text"
            {...register("address", {
              required: "Address is required",
            })}
            className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Enter your street address"
          />
          {errors.address && (
            <p className="mt-2 text-sm text-red-600 font-semibold">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="City"
            />
            {errors.city && (
              <p className="mt-2 text-sm text-red-600 font-semibold">
                {errors.city.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Postal Code
            </label>
            <input
              type="text"
              {...register("postalCode", {
                required: "Postal code is required",
              })}
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Postal code"
            />
            {errors.postalCode && (
              <p className="mt-2 text-sm text-red-600 font-semibold">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            {...register("country", {
              required: "Country is required",
            })}
            className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Country"
          />
          {errors.country && (
            <p className="mt-2 text-sm text-red-600 font-semibold">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
