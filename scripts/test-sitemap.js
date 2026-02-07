
const { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } = require('./src/lib/constants');

function validateSitemap() {
    const baseUrl = 'https://hiddenjobs.netlify.app';
    const urls = [];

    // Simulate generation
    urls.push(`${baseUrl}`);
    urls.push(`${baseUrl}/jobs`);
    urls.push(`${baseUrl}/pricing`);

    DIRECTORY_LOCATIONS.forEach(loc => urls.push(`${baseUrl}/jobs/location/${loc.slug}`));
    DIRECTORY_ROLES.forEach(role => urls.push(`${baseUrl}/jobs/role/${role.slug}`));
    DIRECTORY_PLATFORMS.forEach(platform => urls.push(`${baseUrl}/jobs/platform/${platform.slug}`));

    DIRECTORY_PLATFORMS.forEach(platform => {
        DIRECTORY_ROLES.forEach(role => {
            DIRECTORY_LOCATIONS.forEach(location => {
                urls.push(`${baseUrl}/jobs/${platform.slug}/${role.slug}/${location.slug}`);
            });
        });
    });

    console.log(`Generated ${urls.length} URLs`);

    // Check for illegal characters
    urls.forEach(url => {
        if (/[<>&"']/.test(url)) {
            console.error(`Invalid characters in URL: ${url}`);
        }
        if (url.includes(' ')) {
            console.error(`Spaces in URL: ${url}`);
        }
    });

    console.log('Validation complete');
}

validateSitemap();
