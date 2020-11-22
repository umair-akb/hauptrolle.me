import { fetchData, SideProject } from "./github";

type Response = {
  user: {
    [name: string]: SideProject;
  };
};

export const fetchProjects = async () => {
  const fields = `id
      name
      description
      url
      stargazers {
        totalCount
      }`;

  const query = `
query {
  user (login: "hauptrolle") {
    stitchesUtils: repository(name: "stitches-utils") {
      ${fields}
    }
    stitchesReset: repository(name: "stitches-reset") {
      ${fields}
    }
    reactTodo: repository(name: "react-todo") {
      ${fields}
    }
    hauptrolleMe: repository(name: "hauptrolle.me") {
      ${fields}
    }
  }
}`;

  const data = await fetchData<Response>(query);

  return {
    projects: [
      data.user.stitchesUtils,
      data.user.stitchesReset,
      data.user.reactTodo,
      data.user.hauptrolleMe,
    ],
  };
};
