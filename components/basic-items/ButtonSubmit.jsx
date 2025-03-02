import React from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function ButtonSubmit({ text, loading = false }) {
  return (
    <button
      type="submit"
      className="bg-green-600 font-bold text-white py-3 px-6 w-fit flex justify-center items-center gap-3.5"
      disabled={loading}
    >
      <div>{text}</div>
      {loading && <LoadingSpinner size={{ w: "20", h: "20" }} />}
    </button>
  );
}
