## simple makefile to log workflow
.PHONY: all test clean build install

SHELL := /bin/bash

GOFLAGS ?= $(GOFLAGS:)

export ZILPZALP_TEST = yes

ZILPZALP_ASSETS ?= "$(shell pwd)/assets"
ZILPZALP_TEST_SETTINGS ?= "$(shell pwd)/settings/test"

all: dep install

build:
	@go build $(GOFLAGS) ./...

dep:
	@go get ./...

install:
	@go install $(GOFLAGS) ./...

copyright:
	python .scripts/make_copyright_headers.py

# Currently we run all tests with "-p 1" to ensure that database operations do not interfere with each other

test: dep
	@ZILPZALP_ASSETS=$(ZILPZALP_ASSETS) ZILPZALP_SETTINGS=$(ZILPZALP_TEST_SETTINGS) go test $(testargs) -p 1 -count=1 `go list ./...`

test-races: dep
	@ZILPZALP_ASSETS=$(ZILPZALP_ASSETS) ZILPZALP_SETTINGS=$(ZILPZALP_TEST_SETTINGS) go test -race $(testargs) -p 1 -count=1 `go list ./...`

bench: dep
	@ZILPZALP_ASSETS=$(ZILPZALP_ASSETS) ZILPZALP_SETTINGS=$(ZILPZALP_TEST_SETTINGS) go test -p 1 -run=NONE -bench=. $(GOFLAGS) `go list ./... | grep -v api/`

clean:
	@go clean $(GOFLAGS) -i ./...
