
function devTestHelper() {
    const test_token = process.env.DEV_TEST_TOKEN;
    const token = 'token='+test_token;
    return token;
}
module.exports = devTestHelper;