#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');
const turndownService = new TurndownService({ headingStyle: 'atx' });

function safeFilename(str) {
  return str.replace(/[^a-z0-9-_.]/gi, '-').replace(/-+/g, '-');
}

const postsDir = path.join(process.cwd(), 'data', 'posts');
if (!fs.existsSync(postsDir)) {
  console.error('No data/posts directory found.');
  process.exit(1);
}

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.json'));
if (!files.length) {
  console.log('No JSON posts to convert.');
  process.exit(0);
}

for (const file of files) {
  try {
    const jsonPath = path.join(postsDir, file);
    const raw = fs.readFileSync(jsonPath, 'utf8');
    const post = JSON.parse(raw);
    const slug = post.slug || path.basename(file, '.json');
    const mdPath = path.join(postsDir, `${slug}.md`);
    if (fs.existsSync(mdPath)) {
      console.log('Skipping (md exists):', mdPath);
      continue;
    }

    const html = post.content || '';
    const markdown = turndownService.turndown(html || '');

    const front = [];
    front.push('---');
    if (post.title) front.push(`title: "${String(post.title).replace(/"/g, '\\"') }"`);
    if (post.pubDate) front.push(`pubDate: "${post.pubDate}"`);
    if (post.link) front.push(`link: "${post.link}"`);
    if (post.guid) front.push(`guid: "${post.guid}"`);
    front.push(`slug: "${slug}"`);
    front.push('---\n');

    const md = front.join('\n') + '\n' + markdown;
    fs.writeFileSync(mdPath, md, 'utf8');
    console.log('Converted:', jsonPath, '->', mdPath);
  } catch (err) {
    console.error('Failed to convert', file, err.message || err);
  }
}

console.log('Conversion complete.');
