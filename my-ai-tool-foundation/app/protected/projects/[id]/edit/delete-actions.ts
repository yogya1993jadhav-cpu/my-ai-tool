"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteProject(projectId: string) {
  const supabase = await createClient();

    const {
        data: { user },
          } = await supabase.auth.getUser();

            if (!user) {
                redirect("/auth/login");
                  }

                    const { error } = await supabase
                        .from("projects")
                            .delete()
                                .eq("id", projectId)
                                    .eq("user_id", user.id);

                                      if (error) {
                                          console.error("Project deletion error:", error);
                                              throw new Error("Unable to delete project.");
                                                }

                                                  revalidatePath("/protected");
                                                    redirect("/protected");
                                                    }