"use client";

import { useState } from "react";

type CopyPublicLinkProps = {
  projectId: string;
  };

  export default function CopyPublicLink({
    projectId,
    }: CopyPublicLinkProps) {
      const [copied, setCopied] = useState(false);

        async function copyLink() {
            const url = `${window.location.origin}/projects/${projectId}`;

                await navigator.clipboard.writeText(url);

                    setCopied(true);

                        setTimeout(() => {
                              setCopied(false);
                                  }, 2000);
                                    }

                                      return (
                                          <button
                                                type="button"
                                                      onClick={copyLink}
                                                            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                                                                >
                                                                      {copied ? "Copied!" : "Copy Public Link"}
                                                                          </button>
                                                                            );
                                                                            }