# Potter - The Kubernetes Applications and Services Hub

## Description
Potter - The K8s Applications and Services Hub, is a Kubernetes extension to manage deployments in Kubernetes clusters. It’s a central component in a [Gardener](https://github.com/gardener/gardener) Kubernetes landscape which doesn’t require any additional components running in the managed cluster.

A Potter installation offers a UI (based on the [kubeapps](https://github.com/kubeapps/kubeapps) project), which can be used to manually deploy Helm Charts to Clusters. The UI has been enhanced to work centrally, so that only one Potter installation is required to manage a multitude of Clusters in a remote fashion.

The UI also displays status information about the deployments running in a Cluster. Additionally, it offers a Catalog, in which Helm Charts of connected Helm Chart Repositories can be browsed and deployed. The Repositories offered in the Catalog can easily be configured to match specific usecases.

Apart from the UI, Potter introduces the concept of so-called "Cluster Bill-of-Materials" (in short: 'Cluster-BoMs'). These entities are YAML files, describing a list of Kubernetes Deployments which should run in a specific Cluster. Such a YAML file describes the "desired state" of all applications which should be running in a Cluster. Cluster-BoMs can easily be applied to a Cluster with kubectl. After applying such a Cluster-BoM, the Potter-Controller (located in [this](https://github.com/gardener/potter-controller) repository) will start deploying whatever is part of the Cluster-BoM. A Status Section at the end of the BoM provides the detailed deployment states.

Ideally, Cluster-BoMs are used to fully automate the management of deployments for a Kubernetes Cluster. By using Cluster-BoMs, not only Helm Charts, but also Kapp-Deployments can be managed.

The underlying architecture enables easy extensibility, so that further Kubernetes deployment types can be integrated, Helm Chart and Kapp support is provided out-of-the-box. The technical deployment is heavily based on the [Landscaper Project](https://github.com/gardener/landscaper).

## Installation
Potter is distributed and installed via [Helm](https://github.com/helm/helm). For detailed installation instructions, visit the Helm Chart's [README.md](https://github.com/gardener/potter-hub/chart/hub/README.md).

## Limitations
The current version of the Potter project has the following limitations:
- [kapp](https://github.com/k14s/kapp) deployments are not displayed in the UI. Integration of kapp deployments into the UI is planned, but not yet available.
- Existing Cluster-BoMs for a Cluster can be displayed in the UI, but not edited. This is also on our roadmap.
- Support for Potter installations outside of Gardener landscapes is untested.

## Known Issues
- ...
- ...
  
## How to obtain support
If you encounter any problems using Potter or if you have feature requests, please don't hesitate to contact us via the following channels:
- Slack-Channel: ...
- Google-Group: ...


## Contributing
Potter is offered as Open Source, using the Apache 2.0 license model.

## To-Do (upcoming changes)
- ...
- ...

