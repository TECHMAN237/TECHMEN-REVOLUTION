"use client";

import { useState, useCallback, useRef } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useSession } from "next-auth/react";

const serviceOptions = [
  { value: "", label: "Select a service" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-app", label: "Mobile App Development" },
  { value: "data-analysis", label: "Data Analysis" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "video-editing", label: "Video Editing" },
];

export function ProjectRequestForm() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setMessage(null);

      const formData = new FormData(e.currentTarget);
      const userEmail = (session?.user as any)?.email || (formData.get("email") as string);

      try {
        // Upload file if present
        let fileUrl = "";
        if (uploadedFile) {
          const fileData = new FormData();
          fileData.append("file", uploadedFile);
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: fileData,
          });
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            fileUrl = uploadData.url;
          }
        }

        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            service: formData.get("service"),
            description: formData.get("description"),
            fileUrl,
            userEmail,
          }),
        });

        if (res.ok) {
          setMessage({ type: "success", text: "Project request submitted successfully." });
          (e.target as HTMLFormElement).reset();
          setUploadedFile(null);
        } else {
          setMessage({ type: "error", text: "Failed to submit request. Please try again." });
        }
      } catch {
        setMessage({ type: "error", text: "Something went wrong." });
      }

      setLoading(false);
    },
    [session, uploadedFile]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <Input name="name" type="text" placeholder="Your Name" required />
      <Input name="email" type="email" placeholder="Email Address" required />

      <Select name="service" options={serviceOptions} required />

      <Textarea name="description" placeholder="Tell us about your project..." rows={5} required />

      {/* File Upload */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => setUploadedFile(e.target.files?.[0] ?? null)}
          accept=".pdf,.doc,.docx,.png,.jpg,.zip"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-surface border border-border text-muted px-4 py-3 text-sm text-left transition-all hover:border-white/20 hover:text-text"
        >
          {uploadedFile ? uploadedFile.name : "Attach a file (optional)"}
        </button>
      </div>

      {message && (
        <p
          className={`text-sm ${
            message.type === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {message.text}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
}
