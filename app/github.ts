import {
  notifyGitHubAccessGiven
} from '@/utils/everylog';
import { Octokit } from 'octokit';

const inviteGitHubUser = async (username: string, productId: string) => {
  const token = process.env.GITHUB_TOKEN || '';
  const repositoriesOwner = '<REPO_OWNER>';
  const repositories = ['<REPO_NAME>'];
  const repositoriesPermission = 'read';

  const octokit = new Octokit({
    auth: token
  });
  if (!username) return;

  for (const repo of repositories) {
    try {
      await octokit.request(
        'PUT /repos/{owner}/{repo}/collaborators/{username}',
        {
          owner: repositoriesOwner,
          repo: repo,
          username: username,
          permission: repositoriesPermission,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      );
      await notifyGitHubAccessGiven(username, repo, repositoriesPermission);
    } catch (error: any) {
      await notifyGitHubAccessGiven(
        username,
        repo,
        repositoriesPermission,
        error.message
      );
    }
  }
};

export { inviteGitHubUser };
