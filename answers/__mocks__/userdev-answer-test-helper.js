
function userAnswerDevTestHelper() {
    const test_token = process.env.USERDEV_TEST_TOKEN;
    const token = 'token='+test_token;
    return token;
}
module.exports = userAnswerDevTestHelper;