"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function publishProject(projectId: string) {
  const supabase = await createClient();

    const {
        data: { user },
          } = await supabase.auth.getUser();

            if (!user) {
                redirect("/auth/login");
                  }

                    const { error } = await supabase
                        .from("projects")
                            .update({
                                  status: "published",
                                        updated_at: new Date().toISOString(),
                                            })
                                                .eq("id", projectId)
                                                    .eq("user_id", user.id);

                                                      if (error) {
                                                          console.error("Project publish error:", error);
                                                              throw new Error("Unable to publish project.");
                                                                }

                                                                  revalidatePath("/protected");
                                                                    revalidatePath(`/protected/projects/${projectId}`);

                                                                      redirect(`/protected/projects/${projectId}`);
                                                                      }

                                                                      export async function unpublishProject(projectId: string) {
                                                                        const supabase = await createClient();

                                                                          const {
                                                                              data: { user },
                                                                                } = await supabase.auth.getUser();

                                                                                  if (!user) {
                                                                                      redirect("/auth/login");
                                                                                        }

                                                                                          const { error } = await supabase
                                                                                              .from("projects")
                                                                                                  .update({
                                                                                                        status: "draft",
                                                                                                              updated_at: new Date().toISOString(),
                                                                                                                  })
                                                                                                                      .eq("id", projectId)
                                                                                                                          .eq("user_id", user.id);

                                                                                                                            if (error) {
                                                                                                                                console.error("Project unpublish error:", error);
                                                                                                                                    throw new Error("Unable to unpublish project.");
                                                                                                                                      }

                                                                                                                                        revalidatePath("/protected");
                                                                                                                                          revalidatePath(`/protected/projects/${projectId}`);

                                                                                                                                            redirect(`/protected/projects/${projectId}`);
                                                                                                                                            }