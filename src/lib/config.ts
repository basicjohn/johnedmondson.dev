/**
 * Whether the writing section is exposed to visitors and to search engines.
 *
 * The routes always build, so /en/writing is reachable by direct URL and can
 * be previewed at any time. What this controls is whether anything *points*
 * at it: the header link, the homepage section, the sitemap, and indexing.
 *
 * It is false because the section currently has two published posts. A
 * writing page with one or two entries reads worse than no writing page at
 * all — it invites the reader to judge a body of work that is not there yet.
 *
 * Flip this to true once a third post is published. Nothing else needs to
 * change; the tests assert both states.
 */
export const WRITING_SECTION_PUBLIC = false;

/**
 * Whether the portfolio index shows its tag filter.
 *
 * Off because with five projects the two chips that survive the "must
 * filter something" rule cut the list to three or two cards, which is not a
 * filter so much as a shuffle. The code stays; flip this once there are
 * eight or more projects and the tags carry real weight.
 */
export const PORTFOLIO_TAG_FILTER = false;

/** The "Schedule a chat" link on the contact page */
export const CALENDLY_URL = "https://calendly.com/johnedmondsondev/lets-chat";
