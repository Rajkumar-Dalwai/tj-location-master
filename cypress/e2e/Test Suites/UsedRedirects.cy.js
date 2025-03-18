/// <reference types="cypress" />

describe('Used Tractor Listing and Product Detail Test Suite', () => {
    const testFiles = [
        'e2e/Used Pages/UsedTractor+Brand+StateListingPage.cy',
        'e2e/Used Pages/UsedTractor+Brand+State+CityListingPage.cy',
        'e2e/Used Pages/UsedTractor+Brand+State+PriceListingPage.cy',
        'e2e/Used Pages/UsedTractor+Brand+Model+StateListingPage.cy',
        'e2e/Used Pages/UsedTractor+Brand+Model+State+CityListingPage.cy',
        'e2e/Used Pages/UsedTractor+Brand+State+PriceListingPage.cy',
        'e2e/Used Pages/UsedTractor+Brand+State+City+PriceListingPage.cy',
        'e2e/Used Pages/UsedMiniTractorListingPage.cy',
        'e2e/Used Pages/UsedFarmImplementsListingPage.cy',
        'e2e/Used Pages/UsedHarvestersListingPage.cy',
        'e2e/Used Pages/CertifiedUsedTractorProductdetailPage.cy',
        'e2e/Used Pages/UsedFarmImplementsProductdetailPage.cy',
        'e2e/Used Pages/UsedHarvestersProductdetailPage.cy'
    ];

    testFiles.forEach((file) => {
        it(`Running test: ${file}`, () => {
            cy.exec(`npx cypress run --spec ${file}`);
        });
    });
});
