
function restrictMock() {
    return context.isAuthenticated();
}
module.exports = restrictMock;