import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { Repository } from "./Repos";

export function Repo() {
  const params = useParams();
  const currentRepository = params["*"] as string;

  const queryClient = useQueryClient();

  async function handleChangeRepositoryDescription() {
    // invalidating cache time when have an update
    /*  await queryClient.invalidateQueries(["repos"]);*/

    //will return the list of cached repositories
    const previousRepos = queryClient.getQueryData<Repository[]>("repos");

    if (previousRepos) {
      const nextRepos = previousRepos.map((repo) => {
        if (repo.full_name === currentRepository) {
          return { ...repo, description: "testing" };
        } else {
          return repo;
        }
      });

      queryClient.setQueryData("repos", nextRepos);
    }
  }

  return (
    <div>
      <h1>{currentRepository}</h1>
      <button onClick={handleChangeRepositoryDescription}>
        change description
      </button>
    </div>
  );
}
