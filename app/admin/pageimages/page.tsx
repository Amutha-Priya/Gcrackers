"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function PageImagesAdmin() {
  const [page, setPage] = useState("");
  const [keyName, setKeyName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

useEffect(() => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    router.replace("/admin/login");
  }
}, []);


  const uploadImage = async () => {
    if (!page || !keyName || !image) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("page", page);
    formData.append("key", keyName);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");

      alert("Image uploaded successfully ✅");
      setKeyName("");
      setImage(null);
    } catch (err) {
      alert("Upload error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-xl font-bold mb-6 text-center">
          🖼️ Page Images Admin
        </h1>

        <input
          type="text"
          placeholder="Page name (home / about)"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <input
          type="text"
          placeholder="Image key (banner1, hero)"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="mb-4"
        />

        <button
          onClick={uploadImage}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
}
