import React from "react";
import { useQuery } from "@apollo/client";

import { FETCH_PROJECTS } from "../queries/project.queries";
import Spinner from "../components/Spinner";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { loading, error, data } = useQuery(FETCH_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return "Something went wrong!";

  return (
    <>
      {data.listProjects.length > 0
        ? data.listProjects.map((d) => {
            return <ProjectCard project={d} />;
          })
        : "No projects found!"}
    </>
  );
}
