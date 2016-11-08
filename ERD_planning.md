# MEAN STACK smaller final project: Simply-Shorten
## URL shortener with Google URL Shortener API

- one page
- takes URLs and shortens them
- shows history of shortened URLS
- no auth needed
- full CRUD needed (update Origin)
- Skeleton for front-end framework: https://github.com/skeleton-framework/skeleton-framework

Sections of page:
- on top area to input URL and name of origin site
- button to shorten
- list of all URLs with their shortened url, origin and date

## ERD:
- URL database: only one model
  - originalUrl: string,
  - newUrl: string,
  - siteOfOrigin: string,
  - date: Date

Technologies: Angular, Express, MongoDB, Node
