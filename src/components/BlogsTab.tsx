import React, { useState } from 'react';
import { 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Clock, 
  Calendar, 
  Tag, 
  Share2, 
  ArrowLeft, 
  Sparkles,
  Check
} from 'lucide-react';
import { BlogPost } from '../types';
import { speakText, stopSpeaking } from '../utils/audioSynth';

interface BlogsTabProps {
  blogs: BlogPost[];
}

export const BlogsTab: React.FC<BlogsTabProps> = ({ blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  const categories = ['all', ...Array.from(new Set(blogs.map((b) => b.category)))];

  const filteredBlogs = activeCategory === 'all'
    ? blogs
    : blogs.filter((b) => b.category === activeCategory);

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(
        text,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleShareBlog = (blog: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: `${blog.title} - door Yara Stuif`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Blog Top Header */}
      <div className="rounded-3xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-800 text-white p-6 shadow-xl border border-pink-400/30">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Stuifweb Blogs sinds 2015</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Verhalen & Gedachten van Yara
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
            Inzichten over het leven als visueel beperkte en transgender contentmaker, tips over Apple toegankelijkheid (Stuif Tech) en muzikale avonturen.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                : 'bg-white dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 hover:bg-pink-50 border border-purple-100 dark:border-purple-800/60'
            }`}
          >
            {cat === 'all' ? 'Alle Berichten' : cat}
          </button>
        ))}
      </div>

      {/* Blog List or Full Article View */}
      {selectedBlog ? (
        <article className="rounded-3xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/80 p-5 sm:p-8 shadow-lg space-y-6 animate-in fade-in duration-300">
          {/* Back button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                stopSpeaking();
                setIsSpeaking(false);
                setSelectedBlog(null);
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Terug naar blogoverzicht</span>
            </button>

            {/* Read Aloud Button for Accessibility */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(`${selectedBlog.title}. ${selectedBlog.summary}. ${selectedBlog.content.join(' ')}`)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isSpeaking
                    ? 'bg-pink-600 text-white animate-pulse'
                    : 'bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 hover:bg-pink-100'
                }`}
                title="Lees artikel hardop voor (toegankelijkheid)"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? 'Stop met voorlezen' : 'Lees blog voor'}</span>
              </button>

              <button
                onClick={() => handleShareBlog(selectedBlog)}
                className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 hover:bg-pink-100 transition-colors"
                title="Deel blogbericht"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Article Header */}
          <div className="space-y-3 border-b border-purple-100 dark:border-purple-900/60 pb-5">
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-purple-300">
              <span className="font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                {selectedBlog.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedBlog.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedBlog.readTime}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {selectedBlog.title}
            </h1>

            <p className="text-sm sm:text-base font-medium text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/40 p-4 rounded-2xl border border-pink-200 dark:border-pink-800/50">
              {selectedBlog.summary}
            </p>
          </div>

          {/* Article Body */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-purple-100/90 leading-relaxed">
            {selectedBlog.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article Footer & Tags */}
          <div className="pt-6 border-t border-purple-100 dark:border-purple-900/60 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-pink-500" />
              {selectedBlog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 dark:from-purple-950/60 dark:to-fuchsia-950/60 border border-pink-200 dark:border-purple-800/60 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                  Geschreven door
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Yara Stuif (Stuifweb.nl)
                </p>
                <p className="text-xs text-slate-500 dark:text-purple-300">
                  YouTuber, podcaster en muzikant uit Zwolle
                </p>
              </div>
            </div>
          </div>
        </article>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="rounded-3xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/70 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-pink-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-400 dark:text-purple-400">
                  <span className="font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                    {blog.category}
                  </span>
                  <span>{blog.date}</span>
                </div>

                <h3 
                  onClick={() => setSelectedBlog(blog)}
                  className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-pink-600 cursor-pointer transition-colors leading-snug"
                >
                  {blog.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-purple-200/80 line-clamp-3 leading-relaxed">
                  {blog.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-purple-900/60 flex items-center justify-between">
                <span className="text-xs text-slate-400 dark:text-purple-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {blog.readTime}
                </span>

                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="px-4 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Lees verder
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
