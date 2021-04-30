# Deployment

The following sections describe the deployment of the Zilp-Zalp system components for operators of localities and health departments.

## site operators

Operators of localities can use the Zilp-Zalp web application. This can store data locally or use an operator API to store visit data and (optionally) settings in encrypted form. No registration is required. Alternatively, the operator can use its own operator API server:

```bash
curl https://downloads.zilpzalp.eu/operator/zilpzalp-operator-latest.tar.gz
tar -xvzf zilpzalp-operator-latest.tar.gz
```


The operator API server can then simply be started:

```bash
zilpzalp
```


## Public Health Departments

Health departments communicate with the Zilp-Zalp system via one (or more) external API servers.
