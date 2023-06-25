async function fetchRSSFeed(url, carouselId, accordionNameId) {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);
    const data = await response.json();
    const articles = data.items;
    const carousel = document.getElementById(carouselId);
    const accordionName = document.getElementById(accordionNameId);
    accordionName.textContent = data.feed.title;

    articles.forEach(function (article, index) {
      const cardClass = index === 0 ? "carousel-item active" : "carousel-item";
      const card = `
        <div class="${cardClass}">
          <div class="card">
            <img src="${article.enclosure.link}" class="card-img-top" alt="Article Image" />
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description}</p>
              <a href="${article.link}" class="read-more btn btn-primary">Read More</a>
            </div>
          </div>
        </div>
      `;
      carousel.querySelector(".carousel-inner").insertAdjacentHTML("beforeend", card);
    });

    carousel.addEventListener("click", function (event) {
      const target = event.target;
      if (target.classList.contains("read-more")) {
        event.preventDefault();
        const articleLink = target.getAttribute("href");
        window.open(articleLink, "_blank");
        console.log("Clicked Read More");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// Fetch RSS feeds and populate the carousels
const rssFeeds = [
  {
    topic: "Indoor Plants",
    url: "https://flipboard.com/topic/indoorplants.rss",
    carouselId: "carouselOne",
    accordionNameId: "accordionOneName"
  },
  {
    topic: "Travel",
    url: "https://flipboard.com/topic/travel.rss",
    carouselId: "carouselTwo",
    accordionNameId: "accordionTwoName"
  },
  {
    topic: "Technology",
    url: "https://flipboard.com/topic/technology.rss",
    carouselId: "carouselThree",
    accordionNameId: "accordionThreeName"
  },
];

rssFeeds.forEach(async function (feed) {
  await fetchRSSFeed(feed.url, feed.carouselId, feed.accordionNameId);
});
