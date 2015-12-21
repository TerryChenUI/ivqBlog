describe('app.home', function () {
    describe('when user go to home page', function () {
        beforeEach(function () {
            browser().navigateTo('/');
        });
        it('the blog-body should be visible', function () {
            expect(element(".main").count()).toBe(1);
        });
    });
});