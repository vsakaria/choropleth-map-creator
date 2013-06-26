describe("CreateLedgend", function () {

    var data;

    beforeEach(function () {
        data = {
            foo: 'bar'
        };

    });

    describe("foo", function () {
        it("returns foo ", function () {
            expect(foo()).toEqual('foo');
        });
    });

    describe("loadData", function () {
        it("returns loaded data", function () {
            expect(loaddata(data)).toEqual(data);
        });

        it("loads geoJson data", function () {

        });
    });

});