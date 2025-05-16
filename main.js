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
   "https://www.mvlempyr.com/novel/rebirth-of-the-film-emperors-beloved-wife",
    "https://www.mvlempyr.com/novel/rebirth-of-the-nameless-immortal-god",
    "https://www.mvlempyr.com/novel/rebirth-of-the-supreme-celestial-being",
    "https://www.mvlempyr.com/novel/rebirth-of-the-thief-who-roamed-the-world",
    "https://www.mvlempyr.com/novel/rebirth-of-the-tyrants-pet-regent-prince-is-too-fierce",
    "https://www.mvlempyr.com/novel/rebirth-of-the-villainess-young-master-lus-wicked-wife",
    "https://www.mvlempyr.com/novel/rebirth-of-the-villainous-crown-prince",
    "https://www.mvlempyr.com/novel/rebirth-on-the-doors-to-the-civil-affairs-bureau",
    "https://www.mvlempyr.com/novel/rebirth-slice-of-life-cultivation",
    "https://www.mvlempyr.com/novel/rebirth-stockpiling-the-little-girl-sweeps-through-the-apocalypse",
    "https://www.mvlempyr.com/novel/rebirth-system-blood-and-ash",
    "https://www.mvlempyr.com/novel/rebirth-the-alchemists-path",
    "https://www.mvlempyr.com/novel/rebirth-the-villainous-young-master-doesnt-want-to-follow-the-script",
    "https://www.mvlempyr.com/novel/rebirth-tyrants-new-reality",
    "https://www.mvlempyr.com/novel/reborn-as-a-beastman-with-a-system",
    "https://www.mvlempyr.com/novel/reborn-as-a-dragon-girl-with-a-system",
    "https://www.mvlempyr.com/novel/reborn-as-a-ghost-time-to-build-my-undead-army",
    "https://www.mvlempyr.com/novel/reborn-as-a-mountain-i-defy-the-heavens-with-a-smile",
    "https://www.mvlempyr.com/novel/reborn-as-a-succubus-time-to-live-my-best-life",
    "https://www.mvlempyr.com/novel/reborn-as-a-useless-noble-with-my-sss-class-innate-talent",
    "https://www.mvlempyr.com/novel/reborn-as-a-villainous-cannon-fodder",
    "https://www.mvlempyr.com/novel/reborn-as-an-evolving-space-monster-harem-of-otherworldly-beauties",
    "https://www.mvlempyr.com/novel/reborn-as-an-extra",
    "https://www.mvlempyr.com/novel/reborn-as-god-the-strongest-system",
    "https://www.mvlempyr.com/novel/reborn-as-hades-in-olympus",
    "https://www.mvlempyr.com/novel/reborn-as-my-love-rivals-wife",
    "https://www.mvlempyr.com/novel/reborn-as-noble",
    "https://www.mvlempyr.com/novel/reborn-as-the-genius-son-of-the-richest-family",
    "https://www.mvlempyr.com/novel/reborn-as-the-heros-daughter-time-to-become-the-hero-once-more-wn",
    "https://www.mvlempyr.com/novel/reborn-earth-online",
    "https://www.mvlempyr.com/novel/reborn-ghost-seeing-lady-is-pampered-by-her-ex-husband",
    "https://www.mvlempyr.com/novel/reborn-im-a-dragon-girl-with-an-op-system",
    "https://www.mvlempyr.com/novel/reborn-in-17th-century-india-with-black-technology",
    "https://www.mvlempyr.com/novel/reborn-in-another-world-as-a-hermaphrodite",
    "https://www.mvlempyr.com/novel/reborn-instead-of-chasing-the-school-beauty-i-chased-her-mother",
    "https://www.mvlempyr.com/novel/reborn-into-a-hamster-for-233-days",
    "https://www.mvlempyr.com/novel/reborn-little-girl-wont-give-up",
    "https://www.mvlempyr.com/novel/reborn-regress-return-i-am-the-heir-of-shadows",
    "https://www.mvlempyr.com/novel/reborn-rise-of-the-greatest-summoner",
    "https://www.mvlempyr.com/novel/reborn-space-intelligent-woman",
    "https://www.mvlempyr.com/novel/reborn-the-return-of-the-villainous-mr-liu",
    "https://www.mvlempyr.com/novel/reborn-with-an-old-enemy-on-the-day-of-our-marriage",
    "https://www.mvlempyr.com/novel/reborn-with-infinity-money-system-i-was-worshipped-by-all-universes",
    "https://www.mvlempyr.com/novel/reborn-with-the-all-seeing-eye",
    "https://www.mvlempyr.com/novel/reborn-with-the-infinite-gods-system",
    "https://www.mvlempyr.com/novel/rebuild-world-wn",
    "https://www.mvlempyr.com/novel/rebuilding-the-immortal-cultivator-clan",
    "https://www.mvlempyr.com/novel/red-packet-server",
    "https://www.mvlempyr.com/novel/regressor-instruction-manual",
    "https://www.mvlempyr.com/novel/reign-of-the-hunters",
    "https://www.mvlempyr.com/novel/reigning-supreme-in-countless-worlds-with-beast-taming",
    "https://www.mvlempyr.com/novel/reincarnate-as-the-villainesss-husband",
    "https://www.mvlempyr.com/novel/reincarnated-and-regressed-villain---make-heroines-beg-for-forgiveness",
    "https://www.mvlempyr.com/novel/reincarnated-as-a-business-man",
    "https://www.mvlempyr.com/novel/reincarnated-as-a-dragons-egg-lets-aim-to-be-the-strongest",
    "https://www.mvlempyr.com/novel/reincarnated-as-a-duck-a-beast-progression-litrpg-isekai",
    "https://www.mvlempyr.com/novel/reincarnated-as-a-fox-with-system",
    "https://www.mvlempyr.com/novel/reincarnated-as-a-lion-in-another-world",
    "https://www.mvlempyr.com/novel/reincarnated-as-a-plant-life",
    "https://www.mvlempyr.com/novel/reincarnated-as-a-second-generation-villain",

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
