const API_KEY = "PASTE_YOUR_NYT_API_KEY_HERE";
const API_BASE_URL = "https://api.nytimes.com/svc/mostpopular/v2";

const form = document.querySelector("#filter-form");
const articleList = document.querySelector("#article-list");
const statusMessage = document.querySelector("#status-message");

form.addEventListener("change", loadArticles);
loadArticles();

/**
 * Reads the current radio button choices from the filter form.
 * @returns {{criteria: string, period: string}}
 */
function getSelectedFilters() {
  const criteria = form.elements.criteria.value;
  const period = form.elements.period.value;

  return { criteria, period };
}

/**
 * Requests popular articles from the NYT API and displays the first five
 * articles that have the data needed by this page.
 */
async function loadArticles() {
  const { criteria, period } = getSelectedFilters();

  articleList.innerHTML = "";

  if (API_KEY === "PASTE_YOUR_NYT_API_KEY_HERE") {
    statusMessage.textContent = "Add your NYT API key in main.js to load articles.";
    return;
  }

  statusMessage.textContent = "Loading articles...";

  try {
    const url = `${API_BASE_URL}/${criteria}/${period}.json?api-key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const articleCount = displayArticles(data.results);

    if (articleCount === 0) {
      statusMessage.textContent = "No complete articles were found.";
    } else {
      statusMessage.textContent = "";
    }
  } catch (error) {
    console.log(error);
    statusMessage.textContent = "Could not load articles. Please check the API key and try again.";
  }
}

/**
 * Builds and adds up to five article cards to the page.
 * @param {Array<object>} articles - Articles returned by the NYT API.
 * @returns {number} The number of articles shown.
 */
function displayArticles(articles) {
  const pageFragment = document.createDocumentFragment();
  let articleNumber = 1;

  for (const article of articles) {
    try {
      const articleCard = createArticleCard(article, articleNumber);
      pageFragment.appendChild(articleCard);
      articleNumber += 1;

      if (articleNumber > 5) {
        break;
      }
    } catch (error) {
      console.log("Skipping article:", error);
    }
  }

  articleList.appendChild(pageFragment);
  return articleNumber - 1;
}

/**
 * Creates one article card. If the article is missing required data,
 * this function throws an error so the caller can skip it.
 * @param {object} article - A single NYT article object.
 * @param {number} articleNumber - The ranking number shown to the user.
 * @returns {HTMLElement}
 */
function createArticleCard(article, articleNumber) {
  if (!article.title || !article.abstract || !article.published_date) {
    throw new Error("Article is missing text content.");
  }

  const imageUrl = getArticleImage(article);

  const articleCard = document.createElement("article");
  articleCard.className = "article-card";

  const header = document.createElement("div");
  header.className = "article-header";

  const title = document.createElement("h2");
  title.className = "article-title";
  title.textContent = `${articleNumber}) ${article.title}`;

  const publishedDate = document.createElement("time");
  publishedDate.className = "published-date";
  publishedDate.dateTime = article.published_date;
  publishedDate.textContent = article.published_date;

  const content = document.createElement("div");
  content.className = "article-content";

  const image = document.createElement("img");
  image.className = "article-image";
  image.src = imageUrl;
  image.alt = article.title;

  const abstract = document.createElement("p");
  abstract.className = "article-abstract";
  abstract.textContent = article.abstract;

  header.append(title, publishedDate);
  content.append(image, abstract);
  articleCard.append(header, content);

  return articleCard;
}

/**
 * Gets the largest available image URL for an article.
 * @param {object} article - A single NYT article object.
 * @returns {string}
 */
function getArticleImage(article) {
  if (!Array.isArray(article.media)) {
    throw new Error("Article does not include media.");
  }

  const imageMedia = article.media.find((mediaItem) => mediaItem.type === "image");

  if (!imageMedia) {
    throw new Error("Article does not include image media.");
  }

  const imageChoices = imageMedia["media-metadata"];

  if (!Array.isArray(imageChoices) || imageChoices.length === 0) {
    throw new Error("Article image does not include metadata.");
  }

  const largestImage = imageChoices[imageChoices.length - 1];

  if (!largestImage.url) {
    throw new Error("Article image is missing a URL.");
  }

  return largestImage.url;
}
