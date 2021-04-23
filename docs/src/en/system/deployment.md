# Deployment

The following sections describe the deployment of the Zilp-Zalp system components for operators of localities and health departments.

## site operators

Localities can either use the Zilp-Zalp web application or deploy a local API application that also contains the web application:

```bash
curl https://downloads.zilpzalp.eu/operator/zilpzalp-operator-latest.tar.gz
tar -xvzf zilpzalp-operator-latest.tar.gz
```


The application can then be easily executed:

```bash
zilpzalp
```


## Public Health Departments

Health departments only need to deploy the packaged `ga` API application to run Zilp-Zalp, which also contains the web application.

```
curl https://downloads.zilpzalp.eu/ga/zilpzalp-ga-latest.tar.gz
tar -xvzf zilpzalp-ga-latest.tar.gz
```


The application also needs configuration settings, which can be stored in a directory defined by the environment variable `ZILPZALP_SETTINGS` (by default they are searched in the `settings` subdirectory of the current working directory), and various files (migrations, frontend code), whose location is defined by an environment variable `ZILPZALP_ASSETS` (by default they are searched in the `assets` subdirectory of the current working directory).

```bash
export ZILPZALP_SETTINGS=`readlink -f settings`
export ZILPZALP_ASSES=`readlink -f assets`
zilpzalp
```


Secrets such as keys can also be injected dynamically to avoid local storage. The `zilpzalp` service application can be used for this purpose.

```bash
zilpzalp settings inject
```


