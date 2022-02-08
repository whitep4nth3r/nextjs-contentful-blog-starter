# Next.js + Contentful Blog Starter

![A screenshot of the Next.js Contentful starter home page](screenshot.png)

This is an example repository for you to use to create a new blog site using Next.js and Contentful, using Contentful's GraphQL API.

[Read more about the GraphQL API](https://graphql.contentful.com).

## View the demo site

[Click here to explore the demo site that uses this repository as its source code.](https://nextjs-contentful-blog-starter.vercel.app/)

## Getting set up

Fork the repository to your GitHub account and clone it to your local machine.

```bash
#using git
git clone git@github.com:whitep4nth3r/nextjs-contentful-blog-starter.git

#using the GitHub CLI
gh repo clone whitep4nth3r/nextjs-contentful-blog-starter
```

## Configuring your development environment

### Install dependencies

In a terminal window, navigate to the project directory and install dependencies with npm.

```bash
cd nextjs-contentful-blog-starter
npm install
```

### Set your environment variables

At the root of the project, create a new `.env.local` file. Add the following environment variable names to the file:

```text
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
```

### Using example content from Contentful

**You can choose to use your own Contentful account, or connect to the example space that we've provided.**

If you'd like to view some example content in your development environment to get a feel for how it works, you can use the provided credentials in `env.local.example` which will connect your code to the example space provided by Contentful.

### Using your own Contentful account

To get started with your own Contentful space, [sign up for free](https://www.contentful.com/sign-up/).

Create a new space inside your Contentful account. Go to Settings > General Settings, and make a note of your space ID.

![A screenshot of space ID settings in the Contentful UI](screenshot_space_id.png)

Generate a Content Delivery API access token for your Contentful space.

![A screenshot of access token settings in the Contentful UI](screenshot_access_token.png)

Add your space ID and access token to your `.env.local` file.

## Importing the starter content model and example content into your own Contentful space

To get started quickly on your own version of the application, you can use the Contentful CLI to import the content model and the example content from the starter into your own Contentful space — without touching the Contentful UI!

### Install the Contentful CLI

```bash
#using homebrew
brew install contentful-cli

#using npm
npm install -g contentful-cli

#using yarn
yarn global add contentful-cli
```

### Authenticate with the CLI

Open a terminal and run:

```bash
contentful login
```

A browser window will open. Follow the instructions to log in to Contentful via the CLI.

### Import the content model and example content

The following command in your terminal, ensuring you switch out SPACE_ID for your new space ID.

```bash
cd nextjs-contentful-blog-starter/setup

contentful space import --space-id SPACE_ID --content-file content-export.json
```

You should see this output in the terminal. The import will take around 1 minute to complete.

![A screenshot of the import command running in a terminal](screenshot_import_terminal.png)

Refresh Contentful in your browser, navigate to the content model tab, and you'll find the content types have been imported into your space. You'll find the example content by clicking on the content tab.

![A screenshot of the imported content model in the Contentful UI](screenshot_content_model.png)

## Running the application in development

Navigate to the project directory in a terminal window and run:

```bash
npm run dev
```

## Deploy this site to Netlify

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chrishannaby/nextjs-contentful-blog-starter)

During the deploy process, add the following environment variables to Netlify. Use the same credentials as you set up in your local development environment.

```text
CONTENTFUL_SPACE_ID
CONTENTFUL_ACCESS_TOKEN
```
## Publish via webhooks

After you deploy the site to Netlify you can configure it to build whenever new a new entry is published in Contentful. To configure this navigate to your site settings on Netlify and go to the Build & Deploy tab. Find the Build hooks section and add a new build hook. Name the build hook something like Contentful and select your production branch.

![A screenshot of_adding a_build_hook in the Netlify UI](https://user-images.githubusercontent.com/9747201/152900609-c9b1b3e7-9f4e-47f4-a14f-b01acad7412a.png)

Copy the generated URL and navigate to Settings > Webhooks in your Contentful space. Under Webhook Templates click Add next to the Netlify template. Add the URL you just copied and click Create webhook.

![A screenshot of_adding a_build_hook in the Contentful UI](https://user-images.githubusercontent.com/9747201/152900897-d69409e5-c267-46da-88d9-9dbbfbd76234.png)

Now when you publish an entry in your Contentful space it will trigger a build of your production branch on Netlify.


