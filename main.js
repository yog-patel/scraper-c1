// main.js
const { launchBrowser } = require("./browser");
const { scrapeNovelDetails, scrapeChapters } = require("./scraper");
const { 
  insertNovel, 
  insertChapters, 
  checkNovelExists,
  getLatestChapterNumber,
  closeDbConnection
} = require("./DatabaseOperations");

// Main execution function
async function main() {

    const urls = [
   "https://www.mvlempyr.com/novel/ancient-strengthening-technique",
        "https://www.mvlempyr.com/novel/angel-monarch",
        "https://www.mvlempyr.com/novel/angry-harry-and-the-seven-by-sinyk",
        "https://www.mvlempyr.com/novel/ankoku-kishi-monogatari-yuusha-wo-taosu-tameni-maou-ni-shoukansaremashita",
        "https://www.mvlempyr.com/novel/another-world-mall",
        "https://www.mvlempyr.com/novel/antagonist-protection-service",
        "https://www.mvlempyr.com/novel/apocalypse---evil-shelter-system",
        "https://www.mvlempyr.com/novel/apocalypse-apparently-i-can-see-zombies",
        "https://www.mvlempyr.com/novel/apocalypse-baby",
        "https://www.mvlempyr.com/novel/apocalypse-chaos---i-am-the-villain",
        "https://www.mvlempyr.com/novel/apocalypse-cheater",
        "https://www.mvlempyr.com/novel/apocalypse-descent-farming-with-my-harem",
        "https://www.mvlempyr.com/novel/apocalypse-healer---path-of-death",
        "https://www.mvlempyr.com/novel/apocalypse-i-can-see-the-hp-bar-killing-monsters-drops-loot",
        "https://www.mvlempyr.com/novel/apocalypse-infinite-evolution-starts-from-attribute-allocation",
        "https://www.mvlempyr.com/novel/apocalypse-king-of-zombies",
        "https://www.mvlempyr.com/novel/apocalypse-rebirth-beauties-surround-me",
        "https://www.mvlempyr.com/novel/apocalypse-reset-my-crab-can-heal-the-world",
        "https://www.mvlempyr.com/novel/apocalyptic-disasters-carrying-a-bun-and-hoarding-supplies",
        "https://www.mvlempyr.com/novel/apocalyptic-reincarnation-start-with-a-30-million-bonus",
        "https://www.mvlempyr.com/novel/apotheosis-of-a-demon---a-monster-evolution-story",
        "https://www.mvlempyr.com/novel/arafoo-kenja-no-isekai-seikatsu-nikki",
        "https://www.mvlempyr.com/novel/archean-eon-art",
        "https://www.mvlempyr.com/novel/arena",
        "https://www.mvlempyr.com/novel/arifureta-shokugyou-de-sekai-saikyou-wn",
        "https://www.mvlempyr.com/novel/ark",
        "https://www.mvlempyr.com/novel/arkendrithyst",
        "https://www.mvlempyr.com/novel/armipotent",
        "https://www.mvlempyr.com/novel/as-a-father-i-just-want-to-quietly-watch-you-live-a-long-life",
        "https://www.mvlempyr.com/novel/ascendance-of-a-bookworm",
        "https://www.mvlempyr.com/novel/ascending-do-not-disturb",
        "https://www.mvlempyr.com/novel/ascension-of-chaos",
        "https://www.mvlempyr.com/novel/ascension-of-the-dark-seraph",
        "https://www.mvlempyr.com/novel/ascension-of-the-immortal-asura",
        "https://www.mvlempyr.com/novel/ascension-of-the-monster-queen",
        "https://www.mvlempyr.com/novel/ascension-of-the-unholy-immortal",
        "https://www.mvlempyr.com/novel/ascension-of-the-villain",
        "https://www.mvlempyr.com/novel/ascension-through-skills",
        "https://www.mvlempyr.com/novel/ashen-dragon",
        "https://www.mvlempyr.com/novel/asked-you-to-write-a-book-not-to-confess-your-criminal-record",
        "https://www.mvlempyr.com/novel/assassin-at-range-the-snipers-lethal-power",
        "https://www.mvlempyr.com/novel/assassin-farmer",
        "https://www.mvlempyr.com/novel/assimilate-all-talents",
        "https://www.mvlempyr.com/novel/asuka-of-the-scarlet-sky",
        "https://www.mvlempyr.com/novel/asura-mad-emperor",
        "https://www.mvlempyr.com/novel/at-the-northern-fort",
        "https://www.mvlempyr.com/novel/at-the-start-i-tricked-the-school-beauty-and-ended-up-with-twins",
        "https://www.mvlempyr.com/novel/atelier-tanaka",
        "https://www.mvlempyr.com/novel/attaining-immortality-starting-from-slaying-demons",
        "https://www.mvlempyr.com/novel/atticuss-odyssey-reincarnated-into-a-playground",
        "https://www.mvlempyr.com/novel/attribute-farming-system",
        "https://www.mvlempyr.com/novel/awakened-sss-ranked-soul-king",
        "https://www.mvlempyr.com/novel/awakened-talent-10-000-exp-converter",
        "https://www.mvlempyr.com/novel/awakened-the-spirit-king",
        "https://www.mvlempyr.com/novel/awakening",
        "https://www.mvlempyr.com/novel/awakening-reincarnating-with-the-sss-level-extraction-talent",
        "https://www.mvlempyr.com/novel/awakening-the-daily-intelligence-system",
        "https://www.mvlempyr.com/novel/awakening-the-infinite-evolution-of-my-talent-as-a-low-level-awakener",
        "https://www.mvlempyr.com/novel/aztec-civilization-destiny-to-conquer-america",
      ];

    const browser = await launchBrowser();

    try {
        for (let url of urls) {
            console.log(`Scraping novel from URL: ${url}`);
            const page = await browser.newPage();

            try {
                // Set up the page
                await page.setUserAgent(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                );
                await page.goto(url, { waitUntil: "networkidle2" });

                // // Scrape novel details
                // const novelData = await scrapeNovelDetails(page);
                // console.log("Novel information:", novelData);

                // if (!novelData.title || !novelData.author) {
                //     console.log("Missing essential novel data (title or author). Exiting.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Store novel in database or get existing ID
                // const novelId = await insertNovel({
                //     title: novelData.title,
                //     author: novelData.author,
                //     description: novelData.synopsis,
                //     cover_image_url: novelData.imageLink,
                //     tags: novelData.tags,
                //     genres: novelData.genres,
                //     status: novelData.status,
                // });

                // if (!novelId) {
                //     console.log("Failed to process novel data. Skipping.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Get latest chapter from DB to determine how many chapters to scrape
                // const latestChapterNumber = await getLatestChapterNumber(novelId);
                // console.log(`Current chapters in database: ${latestChapterNumber}`);
                // console.log(`Total chapters on site: ${novelData.numOfCh}`);

                // if (latestChapterNumber >= novelData.numOfCh) {
                //     console.log("Novel is already up to date. No new chapters to scrape.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Calculate how many new chapters to scrape
                // const chaptersToScrape = novelData.numOfCh - latestChapterNumber;
                // console.log(`Need to scrape ${chaptersToScrape} new chapters.`);

                // // Scrape chapters (only the new ones)
                // const scrapedChapters = await scrapeChapters(page, novelData.numOfCh, latestChapterNumber);
                // console.log(`Total new chapters scraped: ${scrapedChapters.length}`);

                // Scrape novel details
        const novelData = await scrapeNovelDetails(page);
        console.log("Novel information:", novelData);

        if (!novelData.title || !novelData.author) {
            console.log("Missing essential novel data (title or author). Exiting.");
            continue;  // Skip this novel and move to the next one
        }

        // Store novel in database or get existing ID
        const novelId = await insertNovel({
            title: novelData.title,
            author: novelData.author,
            description: novelData.synopsis,
            cover_image_url: novelData.imageLink,
            tags: novelData.tags,
            genres: novelData.genres,
            status: novelData.status,
        });

        if (!novelId) {
            console.log("Failed to process novel data. Skipping.");
            continue;  // Skip this novel and move to the next one
        }

        // Get latest chapter from DB to determine how many chapters to scrape
        const latestChapterNumber = await getLatestChapterNumber(novelId);
        
        // Use the most reliable chapter count - prefer numOfCh but fall back to chapters
        // if numOfCh is zero
        const totalChapters = novelData.numOfCh || parseInt(novelData.chapters) || 0;
        
        console.log(`Current chapters in database: ${latestChapterNumber}`);
        console.log(`Total chapters on site: ${totalChapters}`);

        if (latestChapterNumber >= totalChapters || totalChapters === 0) {
            console.log("Novel is already up to date or no chapters found. Skipping.");
            continue;  // Skip this novel and move to the next one
        }

        // Calculate how many new chapters to scrape
        const chaptersToScrape = totalChapters - latestChapterNumber;
        console.log(`Need to scrape ${chaptersToScrape} new chapters.`);

        // Scrape chapters (only the new ones)
        const scrapedChapters = await scrapeChapters(page, totalChapters, latestChapterNumber);
        console.log(`Total new chapters scraped: ${scrapedChapters.length}`);

                // Store new chapters in database
                if (scrapedChapters.length > 0) {
                    const newChaptersCount = await insertChapters(novelId, scrapedChapters);
                    console.log(`${newChaptersCount} new chapters stored in database with Novel ID: ${novelId}`);
                } else {
                    console.log("No new chapters to store.");
                }

            } catch (error) {
                console.error(`Error during scraping URL: ${url}`, error);
            } finally {
                // Close the page after scraping
                await page.close();
            }
        }

    } catch (error) {
        console.error("Error during scraping process:", error);
    } finally {
        // Close browser when done
        await browser.close();
        // Close database connection
        await closeDbConnection();
        console.log("Scraping process completed");
    }
}

// Execute the main function
main().catch(console.error);
