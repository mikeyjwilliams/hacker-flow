
function badAnswerTestHelper() {
    const test_token = process.env.BAD_TEST_TOKEN;
    const token = 'token='+test_token;
    return token;
}
module.exports = badAnswerTestHelper;