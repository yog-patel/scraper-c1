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
        "https://www.mvlempyr.com/novel/calamity-of-tomorrow",
  "https://www.mvlempyr.com/novel/calamity-upon-this-world",
  "https://www.mvlempyr.com/novel/call-of-the-dark",
  "https://www.mvlempyr.com/novel/cameraman-never-dies",
  "https://www.mvlempyr.com/novel/cannon-fire-arc",
  "https://www.mvlempyr.com/novel/cannon-fodder-fake-master-was-stunned-after-being-reborn",
  "https://www.mvlempyr.com/novel/card-apprentice-daily-log",
  "https://www.mvlempyr.com/novel/card-room",
  "https://www.mvlempyr.com/novel/catgirls-and-dungeons-yuri",
  "https://www.mvlempyr.com/novel/cathulhu-online-munya",
  "https://www.mvlempyr.com/novel/celestial-era-the-rise-of-the-full-time-enhancer",
  "https://www.mvlempyr.com/novel/ceos-runaway-mate-and-her-cubs",
  "https://www.mvlempyr.com/novel/champion-of-lust-gods-conquers-harem-paradise",
  "https://www.mvlempyr.com/novel/chaos-devourer-system",
  "https://www.mvlempyr.com/novel/chaos-evolution-only-i-was-granted-3-wishes",
  "https://www.mvlempyr.com/novel/chaos-heir",
  "https://www.mvlempyr.com/novel/chaotic-craftsman-worships-the-cube",
  "https://www.mvlempyr.com/novel/chaotic-lightning-cultivation",
  "https://www.mvlempyr.com/novel/chaotic-sword-god",
  "https://www.mvlempyr.com/novel/charging-magic-with-a-smile-infinite-magic-power-after-being-reincarnated-into-a-different-world",
  "https://www.mvlempyr.com/novel/cheat-awakening",
  "https://www.mvlempyr.com/novel/cheat-cultivators-ascension",
  "https://www.mvlempyr.com/novel/child-of-destiny",
  "https://www.mvlempyr.com/novel/child-of-light",
  "https://www.mvlempyr.com/novel/childhood-friend-of-the-zenith",
  "https://www.mvlempyr.com/novel/chiyu-mahou-no-machigatta-tsukaikata-senjou-wo-kakeru-kaifuku-youin",
  "https://www.mvlempyr.com/novel/chongfei-manual",
  "https://www.mvlempyr.com/novel/chosen-by-fate-rejected-by-the-alpha",
  "https://www.mvlempyr.com/novel/chronicles-of-an-aristocrat-reborn-in-another-world---the-apostle-of-the-gods-who-know-no-self-restraint",
  "https://www.mvlempyr.com/novel/chronicles-of-forgotten-extra",
  "https://www.mvlempyr.com/novel/chronicles-of-primordial-wars",
  "https://www.mvlempyr.com/novel/chronicles-of-sol-the-fall",
  "https://www.mvlempyr.com/novel/chronicles-of-the-true-wizard",
  "https://www.mvlempyr.com/novel/chu-wang-fei",
  "https://www.mvlempyr.com/novel/city-of-sin",
  "https://www.mvlempyr.com/novel/city-of-witches",
  "https://www.mvlempyr.com/novel/civil-servant-in-romance-fantasy",
  "https://www.mvlempyr.com/novel/clan-cultivation-starting-from-beast-taming",
  "https://www.mvlempyr.com/novel/clan-immortal-cultivation-i-can-see-hints",
  "https://www.mvlempyr.com/novel/clan-leader-my-strength-equals-to-that-of-the-entire-clan",

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
