"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const supabase = await createClient();

    const {
        data: { user },
          } = await supabase.auth.getUser();

            if (!user) {
                redirect("/auth/login");
                  }

                    const title = String(formData.get("title") ?? "").trim();
                      const description = String(formData.get("description") ?? "").trim();
                        const projectUrl = String(formData.get("project_url") ?? "").trim();

                          if (!title || !description) {
                              throw new Error("Project title and description are required.");
                                }

                                  const { error } = await supabase.from("projects").insert({
                                      user_id: user.id,
                                          title,
                                              description,
                                                  project_url: projectUrl || null,
                                                      status: "draft",
                                                        });

                                                          if (error) {
                                                              console.error("Project creation error:", error);
                                                                  throw new Error("Unable to create project.");
                                                                    }

                                                                      revalidatePath("/protected");
                                                                        redirect("/protected");
                                                                        }