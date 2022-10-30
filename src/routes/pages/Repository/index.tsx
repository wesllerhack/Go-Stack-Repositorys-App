/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import logoImg from '../../../assets/github-logo.svg';
import { Header, RepositoryInfo, Issues } from './styles';
import api from '../../../services/api';

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const RepositoryPage: React.FC = () => {
  const [repositoryUnique, setRepositoryUnique] = useState<Repository | null>(
    null,
  );
  const [issues, setIssues] = useState<Issue[]>([]);

  const { repository, name } = useParams();

  useEffect(() => {
    void api.get(`repos/${repository}/${name}`).then(response => {
      setRepositoryUnique(response.data);
    });

    void api.get(`repos/${repository}/${name}/issues`).then(response => {
      setIssues(response.data);
    });
  }, [repository, name]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repositoryUnique != null && (
        <RepositoryInfo>
          <header>
            <img
              src={repositoryUnique.owner.avatar_url}
              alt={repositoryUnique.owner.login}
            />
            <div>
              <strong>{repositoryUnique.full_name}</strong>
              <p>{repositoryUnique.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repositoryUnique.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repositoryUnique.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repositoryUnique.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default RepositoryPage;
