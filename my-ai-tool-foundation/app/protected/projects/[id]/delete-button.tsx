"use client";

import { deleteProject } from "./edit/delete-actions";

type DeleteButtonProps = {
  projectId: string;
  };

  export default function DeleteButton({
    projectId,
    }: DeleteButtonProps) {
      const deleteProjectWithId = deleteProject.bind(
          null,
              projectId
                );

                  return (
                      <form
                            action={deleteProjectWithId}
                                  onSubmit={(event) => {
                                          const confirmed = window.confirm(
                                                    "Are you sure you want to delete this project? This action cannot be undone."
                                                            );

                                                                    if (!confirmed) {
                                                                              event.preventDefault();
                                                                                      }
                                                                                            }}
                                                                                                >
                                                                                                      <button
                                                                                                              type="submit"
                                                                                                                      className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                                                                                                            >
                                                                                                                                    Delete Project
                                                                                                                                          </button>
                                                                                                                                              </form>
                                                                                                                                                );
                                                                                                                                                }