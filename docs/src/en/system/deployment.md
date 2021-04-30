# Deployment

The following sections describe the deployment of the Zilp-Zalp system components for operators of localities, health departments and providers of backend and - operator servers.

## site operators

Operators of localities can use the Zilp-Zalp web application. This can store data locally or use an operator API to store visit data and (optionally) settings in encrypted form. No registration is required for this.

## Provider of operator servers

Providers of operator servers run this on a suitable system:

```bash
curl https://downloads.zilpzalp.eu/operator/zilpzalp-operator-latest.tar.gz
tar -xvzf zilpzalp-operator-latest.tar.gz
```


The operator server can then simply be started:

```bash
zilpzalp
```


You have to ensure the correct integration into the federated Zilp-Zalp system via an appropriate configuration.

## Public Health Departments

Health departments communicate with the Zilp-Zalp system via one (or more) external backend servers. For this purpose, health departments must have a signing key, which is linked to a key issued by the health department.

## back-end server provider

Providers of backend servers run them on a suitable system:

```bash
curl https://downloads.zilpzalp.eu/operator/zilpzalp-backend-latest.tar.gz
tar -xvzf zilpzalp-backend-latest.tar.gz
```


The backend server can then simply be started:

```bash
zilpzalp
```


You must also ensure the correct integration into the federated Zilp-Zalp system via an appropriate configuration.
