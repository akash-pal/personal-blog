import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

export const metadata = {
  title: 'Blog'
};

export default function BlogPage() {
  const postsDir = path.join(process.cwd(), 'data', 'posts');
  const files = fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : [];

  const posts = files
    .filter((f) => f.endsWith('.json') || f.endsWith('.md'))
    .map((f) => {
      try {
        const full = fs.readFileSync(path.join(postsDir, f), 'utf8');
        if (f.endsWith('.json')) return JSON.parse(full);
        const parsed = matter(full);
        return {
          title: parsed.data.title || parsed.data.slug || f,
          pubDate: parsed.data.pubDate || null,
          slug: parsed.data.slug || f.replace(/\.md$/, ''),
        };
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => {
      const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return db - da;
    });

  return (
    <div className="bg-white text-gray-900">
      <main className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4">Blog</h1>
        <ul>
          {posts.map((post: any) => (
            <li key={post.slug} className="mb-3">
              <Link href={`/blog/${post.slug}`} className="text-lg font-medium text-gray-900 hover:underline">
                {post.title}
              </Link>
              <div className="text-gray-500 text-sm">{post.pubDate}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
