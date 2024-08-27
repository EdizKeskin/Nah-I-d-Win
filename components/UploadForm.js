"use client";

import { createGojos } from "@/lib/actions";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
export default function UploadForm() {
  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const { pending } = useFormStatus();

  const handleFormChange = () => {
    setIsFormValid(formRef.current?.checkValidity() || false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <form
        ref={formRef}
        action={async (formData) => {
          toast.promise(createGojos(formData), {
            loading: "Adding...",
            success: "Gojo added successfully!",
            error: "Failed to add Gojo.",
          });
          formRef.current?.reset();
          setIsFormValid(false);
        }}
        onChange={handleFormChange}
        className="p-4 mt-6 mb-0 space-y-4 bg-white rounded-lg shadow-lg sm:p-6 lg:p-8"
      >
        <p className="text-lg font-medium text-center">
          Add a new Nah, I&apos;d Win
        </p>

        <div>
          <label htmlFor="title">Title</label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              className="w-full p-3 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
              placeholder="Breaking Bad"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <div className="relative">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="block w-full text-sm border-gray-200 rounded-lg shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={pending || !isFormValid}
          className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
        >
          {pending ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
