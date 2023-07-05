<p align="center">
  <img width="200" src="/public/images/mindescape logo.png">
</p>

👋 **Welcome to the Mindescape blog website**

👉 [Live website](https://mindescape-demo.vercel.app)

# About ⚡

This project is a complement to the [Mindescape CMS project](https://github.com/maciejkuran/mindescape-cms-public). Mindescape CMS is a content management system created for Mindescape administrators and editors, while this project is a blog for the end user. Although these two applications are separate creations, I wanted to show their relationship to each other and the way they talk through the `API routes` (CORS enabled).

👉 You can dive deeper into [Mindescape CMS documentation right here](https://github.com/maciejkuran/mindescape-cms-public).

## Tech Stack

| Frontend | Backend | Design       |
| -------- | ------- | ------------ |
| Next.js  | Next.js | Figma        |
| React    |         | Font Awesome |
| Sass     |         | Unsplash     |
|          |         | Pixabay      |

## Functionalities

Despite the simple nature of the project, it includes many interesting functionalities.

### Dynamic Articles Listing

The whole listing is managed in one place - only one route. Based on the query strings in the URL, a different data will be rendered.

#### Query Strings

Sample URL to get all articles: `/articles?page=1&featured=false`.

Sample URL to get all **featured articles**: `/articles?page=1&featured=true`.

#### Pagination

Based on the encoded page number in the URL e.g. `page=1`, the `getServerSideProps` function will paginate the data on the server and serve some portion of data dynamically. For now, there are `4` articles served per page.

#### All Articles or Featured?

If `featured=false`, all articles are returned. If `true`, only featured will be served by the server.

#### Best SEO Practises

I put a lot of effort into SEO aspects. It's a blog and nobody wants to have a non-crawlable website where all key actions are taken on the client side. There's a discussion about the client-side rendering and the SEO but the best practice, as long as you value to be indexed, is to serve the static content by your server or render the content on the fly/dynamically on the server. Next.js offers incredible features like `getStaticProps` and `getServerSideProps`. Both are amazing but depending on the situation, only one of them is the key.

#### getServerSideProps

`getStaticProps` allows to pre-generate dynamic content (e.g. when `fetch` data from some API) during the `build` process. I used this function to pre-generate article pages. There's no need for dynamic rendering on the server so the build process just fits well. I have specified all paths in `getStaticPaths`, and even if not, the `fallback: 'blocking'` or `fallback: 'true'` property will allow the server to do the job. The property `revalidate` will re-fetch the data from the resource after a specified amount of time when the request is made so the data at certain time intervals is updated (re-fetched).

The opposite is the `/articles?...` page where we have endless possibilities for dynamic URL paths. With the help of `getServerSideProps` function that runs on the server, we can pre-generate any pages on the fly. Static content is returned from the server to the end user, so crawlers can index the content of a page. That's in a nutshell.

#### Handling Errors & Success

All kinds of errors `400` `500` & success messages are handled in the UI.

#### Redirections

I handled redirections on `/articles` page. The user will be redirected from `/articles` to `/articles?page=1&featured=false` page.

### Dynamic Custom Search

- Search by title
- By phrase
- Featured tag

### Newsletter

Users can sign up for a newsletter.

### Comments

Users can leave a comment under an article.

### Contact

Users can send a message.

## UI Design

When I design an interface, I am guided by one thing. I always design an interface that I would like to use myself. In short, friendly and easy to use. I am happy with the design - it's modern, clean and mobile devices friendly.

<p align="center">
  <img src="/public/images/ui.jpg">
</p>
