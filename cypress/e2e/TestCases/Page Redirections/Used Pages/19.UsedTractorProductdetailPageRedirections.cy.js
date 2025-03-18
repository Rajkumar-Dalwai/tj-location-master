// Import page repository
import UsedTractorProductdetailPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/19.UsedTractorProductdetailPage.cy';

// Object mapping for dynamic test execution
const pageRepositories = [
    { name: 'Used Tractor Product Detail Page URLs', urls: UsedTractorProductdetailPageUrls.getUsedTractorProductdetailPageUrls() },
];

describe('Page URL Redirection Validation', () => {
    const failedUrls = {
        notFound: new Set(),
        serverError: new Set(),
        timeout: new Set(),
    };
    let successCount = 0;

    pageRepositories.forEach((repo) => {
        it(`19. Verify Page redirections for Used Tractor Product Detail Page`, () => {
            const urls = Array.isArray(repo.urls) ? repo.urls : [];

            if (!urls.length) {
                cy.log(`⚠️ No URLs found for ${repo.name}`);
                return;
            }

            urls.forEach((url) => {
                const fullUrl = `${Cypress.env('url')}${url}`;

                cy.request({
                    url: fullUrl,
                    failOnStatusCode: false,
                    timeout: 20000, // Increased timeout to 20 seconds
                }).then((response) => {
                    if (response.status === 404) {
                        failedUrls.notFound.add(fullUrl);
                    } else if (response.status >= 500) {
                        failedUrls.serverError.add(fullUrl);
                    } else {
                        successCount++;
                    }
                });
            });
        });
    });

    after(() => {
        const logResults = (label, urls, emoji) => {
            if (urls.size > 0) {
                cy.log(`${emoji} ${label}: ${urls.size} URLs`);
                urls.forEach((url) => cy.log(url)); // Logs each failed URL
            }
        };

        logResults('404 pages', failedUrls.notFound, '❌');
        logResults('500 pages', failedUrls.serverError, '❌');

        cy.log(`✅ Successfully validated pages: ${successCount}`);
    });
});
