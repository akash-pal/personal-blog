import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'data', 'posts');
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.json') || f.endsWith('.md'))
    .map((f) => ({ slug: f.replace(/\.json$|\.md$/, '') }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const postsDir = path.join(process.cwd(), 'data', 'posts');

  const mdPath = path.join(postsDir, `${slug}.md`);
  const jsonPath = path.join(postsDir, `${slug}.json`);

  if (fs.existsSync(mdPath)) {
    const raw = fs.readFileSync(mdPath, 'utf8');
    const parsed = matter(raw);
    const html = marked(parsed.content || '');
    const title = parsed.data.title || slug;
    const pubDate = parsed.data.pubDate || null;
    return (
      <div className="bg-white text-gray-900">
        <article className="post-article">
          <h1>{title}</h1>
          <div className="text-gray-500 mb-4">{pubDate}</div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    );
  }

  if (fs.existsSync(jsonPath)) {
    const raw = fs.readFileSync(jsonPath, 'utf8');
    const post = JSON.parse(raw);
    return (
      <div className="bg-white text-gray-900">
        <article className="post-article">
          <h1>{post.title}</h1>
          <div className="text-gray-500 mb-4">{post.pubDate}</div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    );
  }

  return <div style={{ padding: 24 }}>Post not found</div>;
}
