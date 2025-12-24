#!/usr/bin/env node
const RSSParser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const sanitize = require('sanitize-html');
const TurndownService = require('turndown');
const matter = require('gray-matter');

const turndownService = new TurndownService({ headingStyle: 'atx' });

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  const username = process.argv[2];
  if (!username) {
    console.error('Usage: node import_medium.js <medium-username>');
    process.exit(2);
  }

  const feedUrl = `https://medium.com/feed/@${username}`;
  const parser = new RSSParser({ customFields: { item: ['content:encoded'] } });

  try {
    const feed = await parser.parseURL(feedUrl);
    const outDir = path.join(process.cwd(), 'data', 'posts');
    fs.mkdirSync(outDir, { recursive: true });

    for (const item of feed.items) {
      const title = item.title || 'untitled';
      const slug = slugify(title + (item.isoDate ? `-${item.isoDate}` : ''));
      const contentHtml = item['content:encoded'] || item.content || '';
      const sanitized = sanitize(contentHtml, {
        allowedTags: sanitize.defaults.allowedTags.concat(['h1','h2','img','iframe','figure','figcaption','pre','code']),
        allowedAttributes: {
          a: ['href', 'name', 'target', 'rel'],
          img: ['src', 'alt', 'width', 'height'],
        }
      });

      // Save JSON (legacy) and Markdown (preferred)
      const post = {
        title,
        pubDate: item.isoDate || item.pubDate || null,
        link: item.link || null,
        content: sanitized,
        guid: item.guid || null,
        slug
      };

      const outPathJson = path.join(outDir, `${slug}.json`);
      fs.writeFileSync(outPathJson, JSON.stringify(post, null, 2), 'utf8');

      // Convert sanitized HTML to Markdown and add frontmatter
      const markdown = turndownService.turndown(sanitized || '');
      const mdWithFront = `---\ntitle: "${title.replace(/"/g, '\\"')}"\npubDate: "${post.pubDate || ''}"\nlink: "${post.link || ''}"\nslug: "${slug}"\n---\n\n${markdown}`;
      const outPathMd = path.join(outDir, `${slug}.md`);
      fs.writeFileSync(outPathMd, mdWithFront, 'utf8');
      console.log('Wrote', outPathJson, 'and', outPathMd);
    }

    console.log('Import complete. Posts written to data/posts');
  } catch (err) {
    console.error('Failed to import feed:', err.message || err);
    process.exit(1);
  }
}

main();
