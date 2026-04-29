"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simulated submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage({ type: "success", text: "Message sent. We'll get back to you soon." });
    (e.target as HTMLFormElement).reset();
    setLoading(false);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      <Input name="name" type="text" placeholder="Name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Textarea name="message" placeholder="Message" rows={4} required />

      {message && (
        <p className={`text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
          {message.text}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}
