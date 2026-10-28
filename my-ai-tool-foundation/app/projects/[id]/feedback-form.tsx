"use client";

import { useState } from "react";
import { submitFeedback } from "./feedback-actions";

type FeedbackFormProps = {
  projectId: string;
  };

  export default function FeedbackForm({
    projectId,
    }: FeedbackFormProps) {
      const [message, setMessage] = useState("");
        const [result, setResult] = useState<string | null>(null);
          const [loading, setLoading] = useState(false);

            async function handleSubmit(
                event: React.FormEvent<HTMLFormElement>
                  ) {
                      event.preventDefault();

                          setLoading(true);
                              setResult(null);

                                  const formData = new FormData();
                                      formData.set("message", message);

                                          const response = await submitFeedback(projectId, formData);

                                              if (response.error) {
                                                    setResult(response.error);
                                                        } else if (response.success) {
                                                              setMessage("");
                                                                    setResult(response.success);
                                                                        }

                                                                            setLoading(false);
                                                                              }

                                                                                return (
                                                                                    <div className="mt-8 border-t pt-6">
                                                                                          <h2 className="text-lg font-semibold">
                                                                                                  Give Feedback
                                                                                                        </h2>

                                                                                                              <form
                                                                                                                      onSubmit={handleSubmit}
                                                                                                                              className="mt-4 space-y-4"
                                                                                                                                    >
                                                                                                                                            <textarea
                                                                                                                                                      value={message}
                                                                                                                                                                onChange={(event) => setMessage(event.target.value)}
                                                                                                                                                                          placeholder="Share your feedback about this project..."
                                                                                                                                                                                    rows={5}
                                                                                                                                                                                              className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-black"
                                                                                                                                                                                                        required
                                                                                                                                                                                                                />

                                                                                                                                                                                                                        <button
                                                                                                                                                                                                                                  type="submit"
                                                                                                                                                                                                                                            disabled={loading}
                                                                                                                                                                                                                                                      className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                                        {loading ? "Submitting..." : "Submit Feedback"}
                                                                                                                                                                                                                                                                                </button>

                                                                                                                                                                                                                                                                                        {result && (
                                                                                                                                                                                                                                                                                                  <p className="text-sm text-gray-600">
                                                                                                                                                                                                                                                                                                              {result}
                                                                                                                                                                                                                                                                                                                        </p>
                                                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                                                                      </form>
                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                            }