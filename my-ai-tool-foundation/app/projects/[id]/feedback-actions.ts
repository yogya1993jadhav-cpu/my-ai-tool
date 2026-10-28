"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitFeedback(
  projectId: string,
    formData: FormData
    ) {
      const message = formData.get("message")?.toString().trim();

        if (!message) {
            return {
                  error: "Feedback cannot be empty.",
                      };
                        }

                          const supabase = await createClient();

                            const {
                                data: { user },
                                  } = await supabase.auth.getUser();

                                    if (!user) {
                                        return {
                                              error: "You must be logged in to submit feedback.",
                                                  };
                                                    }

                                                      const { error } = await supabase.from("feedback").insert({
                                                          project_id: projectId,
                                                              user_id: user.id,
                                                                  message,
                                                                    });

                                                                      if (error) {
                                                                          console.error(error);

                                                                              return {
                                                                                    error: "Could not submit feedback.",
                                                                                        };
                                                                                          }

                                                                                            revalidatePath(`/projects/${projectId}`);

                                                                                              return {
                                                                                                  success: "Feedback submitted successfully.",
                                                                                                    };
                                                                                                    }