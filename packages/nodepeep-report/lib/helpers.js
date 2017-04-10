
/**
 * @summary Check if a user has upvoted a document
 * @param {Object} user
 * @param {Object} document
 * @returns {Boolean}
 */
const hasReported = (user, document) => {
  // note(apollo): check upvoters depending if the document is queried by mongo directly or fetched by an apollo resolver
  return user && document.reporters && !!document.reporters.find(u => typeof u === 'string' ? u === user._id : u._id === user._id);
};

export { hasReported }
