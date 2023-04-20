# create a senior level api

- cors ==> (done)
- api versionning ==> (done)
- api security ==> (start with best practices)
- architecture
- solid (add solid principles --> code)
- test api (jest - Supertest)
- scale api
- message broker (kafka - RabbitMQ)
- server / cloud deployment (docker - aws - kubernetes)

# API Versionning

It's the process of managing an API, and ensuring that cahgnes are made without disturbing the clients (consumers).

A good API versioning strategy clearly communicates the changes made and allows API consumers to decide when to upgrade to the latest version at their own pace.

## API Importance

- allows us to improve, change or add additional features to it.
- clients can keep using previous (anterior) versions while developement works on the new version.
- allows clients to upgrade at their own page.

## Data Contracts

An API is an Application Programming Interface, and an interface is a shared boundary to exchange information. The data contract is the heart of this interface.
A data contract is an agreement on the shape and general content of the request and/or response data.

## When to Version an API

we create a new API version when we made changes that impact the API usability, adding new features, responses provided by API, ...

## How to Do API versioning

- keep previous versions of API in archive supported (to allows clients backwards).
- inform clients about hte API inside the documentation
- to finally sunset the old versions, check the usage of these versions and the newer ones (if previous one rate is low, and new one is high the sunset old ones).
- communicate to the client about deprecated versions (on documentation / API itself)

Think about the scope
We can think of levels of scope change within a tree analogy:

- Leaf - A change to an isolated endpoint with no relationship to other endpoints
- Branch - A change to a group of endpoints or a resource accessed through several endpoints
- Trunk - An application-level change, warranting a version change on most or all endpoints
- Root - A change affecting access to all API resources of all versions

## Types of API Versioning

most common ways to version an API:

- URI Path: (specify the version inside the uri path) --> Leaf / Branch
  ex: <https://www.example.com/api/v1/resource>

- Query Parameters: (version is included in the uri as a query parameter) --> Leaf
  ex: <https://www.example.com/api/resource?version=1>

- Custom Request Header: (specify the API version inside the headers) --> Leaf
  ex: Curl -H "accepts-versions: 1:
  <https://www.imaginaryapi.com/api/products>

  pros: helps developers to version a resource instead the entire API.

## NB

URI: is the most straightforward solution
For more complex or volatile APIs, you can manage varying scopes of changes by employing an integration of URI path and query params approaches
we can also redirect client to newer versions while they specify older ones.

# API Doucmentation

it's a document which explain what the API does, and how it does it.

## who write API documentation

technical write is the one who's in charge to write the documentation with the lead of developer.

## Type of API documentation

- Reference and functionality: (can be generated) you’ll find a list of API endpoints, what request and response fields are available, and how to authenticate with the API. --> WHAT.
- Guides and tutorials: following best practices helps developers understand the --> WHY / HOW.
- Examples and use cases: includes all the code you need to produce a full integration with your API. (have often many examples with the source code).

## What it Contains

- Overview: contains the purpose of this API, what probelm it solves, how to solves it, and benefits of this API comparaisons to others.
- Tutorial: a simple / basic guide on how to integrat this API (to function properly)
- Examples: explain how to use this API with examples (request/response - error handling - ...)
- Glossary: helps the user to use this API (what it contains, directly go where they need)

## How to use a documentation

1. start with reading first sections of the doc (purpose, problem solved, how is it different from others, pros/cons, ...)
2. section fast start
3. see examples
4. read doc + practice
5. check doc version
6. beug: check stackoverflow / github discussion - issues - ...
7. read source code / unit tests (understand how it works)

## NB: to write a useful API documentation

- know the API
- Use Relatable Content (add illustration / videos) --> improve quality of explanations provided.
- Be Clear, Even If You Need to Be Technical.
- Itemize the Guide (show step by step guide).
- check errors (review well the code, ask people to add PR with they encounter an error).
- keep documentation up-to-date.
- specify the version of the API in the documentation.

## Scale API
