
var assert = require("assert");
var equal = require('assert-dir-equal');
var Metalsmith = require("metalsmith");
var katex = require("..");

describe("metalsmith-katex", function () {
    it("should convert TeX formulas with default delimiter", function (done) {
        Metalsmith("test/fixtures/default")
            .use(katex())
            .build(function (err, files) {
                if (err) return done(err);
                equal('test/fixtures/default/expected', 'test/fixtures/default/build');
                assert(files["index.html"].katex);
                done();
            });
    });
    it("should convert TeX formulas with same start and end delimiter", function (done) {
        Metalsmith("test/fixtures/same-delimiter")
            .use(katex({
				startDelimiter: "$",
				endDelimiter: "$"
			}))
            .build(function (err, files) {
                if (err) return done(err);
                equal('test/fixtures/default/expected', 'test/fixtures/default/build');
                assert(files["index.html"].katex);
                done();
            });
    });
});
