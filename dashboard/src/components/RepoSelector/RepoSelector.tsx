import { RouterAction } from "connected-react-router";
import * as React from "react";
import * as Select from "react-select";

import { IAppRepositoryState } from "../../reducers/repos";
import { allRepositories } from "../../shared/Catalog";
import { isHiddenAnnotated } from "../../shared/utils";
import "./RepoSelector.css";

interface IRepoSelectorProps {
  repo: string | undefined;
  appRepoState: IAppRepositoryState;
  defaultRepo: string | undefined;
  push: (location: string) => RouterAction;
}

class RepoSelector extends React.Component<IRepoSelectorProps> {
  public componentDidMount() {
    if (!this.props.appRepoState.isFetching && this.props.appRepoState.repos.length > 0) {
      if (!this.props.repo) {
        this.setDefaultRepo()
      }
    }
  }

  public componentDidUpdate() {
    if (!this.props.appRepoState.isFetching && this.props.appRepoState.repos.length > 0) {
      if (!this.props.repo) {
        this.setDefaultRepo()
      }
    }
  }

  public render() {
    const options = this.props.appRepoState.repos.filter(r => !isHiddenAnnotated(r))
    .map(r => ({
      value: r.metadata.name,
      label: r.metadata.name,
    }));
    if (options.length > 1) {
      options.unshift({ value: allRepositories.value, label: allRepositories.label });
    }

    return (
      <div className="RepoSelector">
        <label className="RepoSelector__label type-tiny">REPOSITORY</label>
        <Select.Creatable
          className="RepoSelector__select type-small"
          value={this.props.repo}
          options={options}
          isValidNewOption={this.isValidNewOption}
          multi={false}
          onChange={this.handleRepoChange}
          clearable={false}
        />
      </div>
    );
  }

  private isValidNewOption = () => {
    return false;
  };

  private handleRepoChange = (value: any) => {
    this.props.push(`/catalog/${value.value}`);
  };

  private setDefaultRepo = () => {
    let defaultRepo;
    if (this.props.defaultRepo) {
      defaultRepo = this.props.appRepoState.repos.find(repo => {
        return repo.metadata.name === this.props.defaultRepo;
      })?.metadata.name;
    }
    if (!defaultRepo) {
      if (this.props.appRepoState.repos.length > 1) {
        defaultRepo = allRepositories.value;
      } else {
        defaultRepo = this.props.appRepoState.repos[0].metadata.name;
      }
    }
    this.props.push(`/catalog/${defaultRepo}`);
  }

}

export default RepoSelector;
