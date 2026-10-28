"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProject(
  projectId: string,
    formData: FormData
    ) {
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

                                      const { error } = await supabase
                                          .from("projects")
                                              .update({
                                                    title,
                                                          description,
                                                                project_url: projectUrl || null,
                                                                      updated_at: new Date().toISOString(),
                                                                          })
                                                                              .eq("id", projectId)
                                                                                  .eq("user_id", user.id);

                                                                                    if (error) {
                                                                                        console.error("Project update error:", error);
                                                                                            throw new Error("Unable to update project.");
                                                                                              }

                                                                                                revalidatePath("/protected");
                                                                                                  revalidatePath(`/protected/projects/${projectId}`);
                                                                                                    revalidatePath(`/protected/projects/${projectId}/edit`);

                                                                                                      redirect(`/protected/projects/${projectId}`);
                                                                                                      }