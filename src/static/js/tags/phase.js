/**
 * @summary Constructs a custom JSDoc3 tag: `@phase`
 * @module jsdoc.phase
 * @see [StackOverflow]{@link https://stackoverflow.com/a/33944463}
 */
exports.defineTags = function(dictionary) {
    dictionary.defineTag('phase', {
        mustHaveValue: true,
        onTagged : function(doclet, tag) {
            doclet.phase = doclet.phase || [];
            doclet.phase.push(tag.value);
        }
    });
};