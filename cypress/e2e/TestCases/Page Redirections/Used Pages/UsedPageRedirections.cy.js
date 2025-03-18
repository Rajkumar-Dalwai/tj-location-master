// Import all page repositories
import UsedLandingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/0.UsedLandingPages.cy';
import HeaderUrls from '../../../Reusable-Utilities/Page Redirections/Header URL Repo/1.Header.cy';
import FooterUrls from '../../../Reusable-Utilities/Page Redirections/FooterURL Repo/2.Footer.cy';
import CertifiedUsedTractorListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/3.CertifiedUsedTractorListingPage.cy';
import UsedTractorListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/4.UsedTractorListingPage.cy';
import UsedTractorBrandListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/5.UsedTractor+BrandListingPage.cy';
import UsedTractorPriceListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/6.UsedTractor+PriceListingPage.cy';
import UsedTractorYearListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/7.UsedTractor+YearListingPage.cy';
import UsedTractorHPListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/8.UsedTractor+HPListingPage.cy';
import UsedTractorLocationListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/9.UsedTractor+LocationListingPage.cy';
import UsedTractorBrandStateListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/10.UsedTractor+Brand+StateListingPage.cy';
import UsedTractorBrandStateCityListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/11.UsedTractor+Brand+State+CityListingPage.cy';
import UsedTractorBrandPriceListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/12.UsedTractor+Brand+PriceListingPage.cy';
import UsedTractorBrandModelStateListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/13.UsedTractor+Brand+Model+StateListingPage.cy';
import UsedTractorBrandModelStateCityListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/14.UsedTractor+Brand+Model+State+CityListingPage.cy';
import UsedTractorBrandStatePriceListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/15.UsedTractor+Brand+State+PriceListingPage.cy';
import UsedTractorBrandStateCityPriceListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/16.UsedTractor+Brand+State+City+PriceListingPage.cy';
import UsedMiniTractorsListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/17.UsedMiniTractorsListingPage.cy';
import UsedFarmImplementsListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/18.UsedFarmImplementsListingPage.cy';
import UsedHarvestersListingPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/19.UsedHarvestersListingPage.cy';
import UsedTractorProductdetailPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/20.UsedTractorProductdetailPage.cy';
import CertifiedUsedTractorProductdetailPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/21.CertifiedUsedTractorProductdetailPage.cy';
import UsedFarmImplementsProductdetailPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/22.UsedFarmImplementsProductdetailPage.cy';
import UsedHarvestersProductdetailPageUrls from '../../../Reusable-Utilities/Page Redirections/Used Pages/23.UsedHarvestersProductdetailPage.cy';

// Object mapping for dynamic test execution
const pageRepositories = [
    /*{ name: 'Used Landing Page URLs', urls: UsedLandingPageUrls.getUsedLandingPageUrls() },
    { name: 'Header URLs', urls: HeaderUrls.getHeaderUrls() },
    { name: 'Footer URLs', urls: FooterUrls.getFooterUrls() },
    { name: 'Certified Used Tractor Listing Page URLs', urls: CertifiedUsedTractorListingPageUrls.getCertifiedUsedTractorListingPageUrls() },
    { name: 'Used Tractor Listing Page URLs', urls: UsedTractorListingPageUrls.getUsedTractorListingPageUrls() },
    { name: 'Used Tractor Brand Listing Page URLs', urls: UsedTractorBrandListingPageUrls.getUsedTractorBrandListingPageUrls() },*/
    { name: 'Used Tractor Price Listing Page URLs', urls: UsedTractorPriceListingPageUrls.getUsedTractorPriceListingPageUrls() },
   /* { name: 'Used Tractor Year Listing Page URLs', urls: UsedTractorYearListingPageUrls.getUsedTractorYearListingPageUrls() },
    { name: 'Used Tractor HP Listing Page URLs', urls: UsedTractorHPListingPageUrls.getUsedTractorHPListingPageUrls() },
    { name: 'Used Tractor Location Listing Page URLs', urls: UsedTractorLocationListingPageUrls.getUsedTractorLocationListingPageUrls() },
    { name: 'Used Tractor Brand State Listing Page URLs', urls: UsedTractorBrandStateListingPageUrls.getUsedTractorBrandStateListingPageUrls() },
    { name: 'Used Tractor Brand State City Listing Page URLs', urls: UsedTractorBrandStateCityListingPageUrls.getUsedTractorBrandStateCityListingPageUrls() },
    { name: 'Used Tractor Brand Price Listing Page URLs', urls: UsedTractorBrandPriceListingPageUrls.getUsedTractorBrandPriceListingPageUrls() },
    { name: 'Used Tractor Brand Model State Listing Page URLs', urls: UsedTractorBrandModelStateListingPageUrls.getUsedTractorBrandModelStateListingPageUrls() },
    { name: 'Used Tractor Brand Model State City Listing Page URLs', urls: UsedTractorBrandModelStateCityListingPageUrls.getUsedTractorBrandModelStateCityListingPageUrls() },
    { name: 'Used Tractor Brand State Price Listing Page URLs', urls: UsedTractorBrandStatePriceListingPageUrls.getUsedTractorBrandStatePriceListingPageUrls() },
    { name: 'Used Tractor Brand State City Price Listing Page URLs', urls: UsedTractorBrandStateCityPriceListingPageUrls.getUsedTractorBrandStateCityPriceListingPageUrls() },
    { name: 'Used Mini Tractors Listing Page URLs', urls: UsedMiniTractorsListingPageUrls.getUsedMiniTractorsListingPageUrls() },
    { name: 'Used Farm Implements Listing Page URLs', urls: UsedFarmImplementsListingPageUrls.getUsedFarmImplementsListingPageUrls() },
    { name: 'Used Harvesters Listing Page URLs', urls: UsedHarvestersListingPageUrls.getUsedHarvestersListingPageUrls() },
    { name: 'Used Tractor Product Detail Page URLs', urls: UsedTractorProductdetailPageUrls.getUsedTractorProductdetailPageUrls() },
    { name: 'Certified Used Tractor Product Detail Page URLs', urls: CertifiedUsedTractorProductdetailPageUrls.getCertifiedUsedTractorProductdetailPageUrls() },
    { name: 'Used Farm Implements Product Detail Page URLs', urls: UsedFarmImplementsProductdetailPageUrls.getUsedFarmImplementsProductdetailPageUrls() },
    { name: 'Used Harvesters Product Detail Page URLs', urls: UsedHarvestersProductdetailPageUrls.getUsedHarvestersProductdetailPageUrls() }*/
];

describe('Page URL Redirection Validation', () => {
    const notFoundUrls = new Set();
    const serverErrorUrls = new Set();
    const timeoutUrls = new Set();

    pageRepositories.forEach((repo, index) => {
        it(`Test ${index + 1}: Validate ${repo.name}`, () => {
            const urls = Array.isArray(repo.urls) ? repo.urls : [];
            
            if (urls.length === 0) {
                cy.log(`No URLs found for ${repo.name}`);
                return;
            }

            urls.forEach((url) => {
                const fullUrl = `${Cypress.env('url')}${url}`;
                
                cy.wrap(null, { log: false }).then(() => {
                    return cy.request({
                        url: fullUrl,
                        failOnStatusCode: false,
                        timeout: 20000 // Increased timeout to 20 seconds
                    });
                }).then((response) => {
                    if (response && response.status) {
                        if (response.status === 404) {
                            notFoundUrls.add(fullUrl);
                            cy.log(`404 Error: ${fullUrl}`);
                        } else if (response.status >= 500) {
                            serverErrorUrls.add(fullUrl);
                            cy.log(`500 Error: ${fullUrl}`);
                        } else {
                            cy.log(`URL validated successfully: ${fullUrl}`);
                        }
                    } else {
                        timeoutUrls.add(fullUrl);
                        cy.log(`Request timed out or no response: ${fullUrl}`);
                    }
                });
            });
        });
    });

    after(() => {
        // Logging 404 URLs
        if (notFoundUrls.size > 0) {
            cy.log('404 pages:');
            cy.task('log', '404 pages:');
            notFoundUrls.forEach((url) => {
                cy.log(url);
                cy.task('log', url);
            });
        } else {
            cy.log('No 404 pages found.');
            cy.task('log', 'No 404 pages found.');
        }

        // Logging 500 URLs
        if (serverErrorUrls.size > 0) {
            cy.log('500 pages:');
            cy.task('log', '500 pages:');
            serverErrorUrls.forEach((url) => {
                cy.log(url);
                cy.task('log', url);
            });
        } else {
            cy.log('No 500 pages found.');
            cy.task('log', 'No 500 pages found.');
        }

        // Logging Timeout URLs
        if (timeoutUrls.size > 0) {
            cy.log('Timed out pages:');
            cy.task('log', 'Timed out pages:');
            timeoutUrls.forEach((url) => {
                cy.log(url);
                cy.task('log', url);
            });
        } else {
            cy.log('No timed-out pages found.');
            cy.task('log', 'No timed-out pages found.');
        }
    });
});



