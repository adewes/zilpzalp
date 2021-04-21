**Note: This is a work in progress!**

# Zilp-Zalp - Apps

This repository contains the source code and build assets for our web apps.

## Installation

First, install the required node modules:

```bash
npm install
```

## Building

To build the web application, run

```bash
# development version with test settings (i.e. mocked APIs):
npm run-script make-web-dev-test
# production version:
npm run-script make-web
```

## Linting

To run linters

```bash
# development version with test settings (i.e. mocked APIs):
npm run-script lint-fix
```


### Code Organization

Try to keep things that belong together close together in the codebase.


### Third-Party Licenses

Most of the third-party packages we use are imported via `package.json`. For convenience, we integrate some libraries directly. You can find their licenses and full source code here:

* [Bulma](https://github.com/jgthms/bulma)
* [Font Awesome](https://github.com/FortAwesome/Font-Awesome)
* [classNames](https://github.com/JedWatson/classnames)
* [Muli](https://github.com/vernnobile/MuliFont)
* [Nunito](https://github.com/vernnobile/NunitoFont)

Please let us know if we forgot to include a library here.