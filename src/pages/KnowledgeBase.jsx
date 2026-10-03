
import { useMemo, useState } from "react";
import "./Pages.css";
import {
  Search,
  BookOpen,
  FileText,
  ArrowUpRight,
  Plus,
  Clock3,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Wrench,
  X,
} from "lucide-react";
import "./Pages.css";

const articles = [
  {
    id: 1,
    category: "Getting Started",
    title: "Getting started with your account",
    description: "Learn how to create your account, configure your profile, and get started with the platform.",
    readTime: "5 min read",
    icon: BookOpen,
  },
  {
    id: 2,
    category: "Account & Security",
    title: "Account security best practices",
    description: "Understand password security, authentication, and ways to protect your account.",
    readTime: "7 min read",
    icon: ShieldCheck,
  },
  {
    id: 3,
    category: "Billing",
    title: "Understanding billing and payments",
    description: "Find information about payment methods, invoices, and subscription billing.",
    readTime: "4 min read",
    icon: CreditCard,
  },
  {
    id: 4,
    category: "Troubleshooting",
    title: "Resolving common technical issues",
    description: "Explore basic troubleshooting steps for common application problems.",
    readTime: "6 min read",
    icon: Wrench,
  },
  {
    id: 5,
    category: "Getting Started",
    title: "Navigating the support workspace",
    description: "Learn how to use the dashboard, support tickets, and knowledge center.",
    readTime: "4 min read",
    icon: FileText,
  },
  {
    id: 6,
    category: "Troubleshooting",
    title: "How to report a technical issue",
    description: "Understand what information to include when submitting a support request.",
    readTime: "3 min read",
    icon: Wrench,
  },
];

const categories = [
  "All Articles",
  "Getting Started",
  "Account & Security",
  "Billing",
  "Troubleshooting",
];

function KnowledgeBase() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [customArticles, setCustomArticles] = useState([]);

  const allArticles = [...customArticles, ...articles];

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory =
        activeCategory === "All Articles" ||
        article.category === activeCategory;

      const matchesSearch =
        `${article.title} ${article.description} ${article.category}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allArticles, activeCategory, search]);

  const createArticle = (event) => {
    event.preventDefault();

    if (!articleTitle.trim()) return;

    setCustomArticles((previous) => [
      {
        id: Date.now(),
        title: articleTitle.trim(),
        description: articleDescription.trim() || "New support resource.",
        category: "Getting Started",
        readTime: "2 min read",
        icon: FileText,
      },
      ...previous,
    ]);

    setArticleTitle("");
    setArticleDescription("");
    setShowModal(false);
  };

  return (
    <div className="workspace-page">
      <section className="knowledge-hero">
        <div className="knowledge-hero-content">
          <span className="workspace-eyebrow">
            <Sparkles size={13} />
            KNOWLEDGE CENTER
          </span>

          <h1>Knowledge Base</h1>

          <p>
            Find answers, explore helpful guides, and learn how to
            get the most out of your support experience.
          </p>

          <div className="knowledge-search">
            <Search size={19} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search articles, topics, or keywords..."
            />
            <kbd>⌘ K</kbd>
          </div>

          <div className="knowledge-hero-footer">
            <span><BookOpen size={15} /> Helpful guides</span>
            <span><ShieldCheck size={15} /> Support resources</span>
          </div>
        </div>

        <div className="knowledge-hero-art">
          <div className="knowledge-art-glow" />
          <div className="knowledge-art-card">
            <BookOpen size={47} />
            <div className="knowledge-art-lines">
              <span />
              <span />
              <span />
            </div>
            <div className="knowledge-art-badge">
              <Sparkles size={15} />
              Smart Knowledge
            </div>
          </div>
        </div>
      </section>

      <div className="knowledge-section-heading">
        <div>
          <h2>Explore Articles</h2>
          <p>Helpful resources curated by our support team.</p>
        </div>

        <button className="primary-action" onClick={() => setShowModal(true)} type="button">
          <Plus size={17} />
          New Article
        </button>
      </div>

      <div className="knowledge-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-chip ${activeCategory === category ? "category-active" : ""}`}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="knowledge-results">
        <span>{filteredArticles.length} articles</span>
        <span><Clock3 size={14} /> Recently updated</span>
      </div>

      <div className="knowledge-grid">
        {filteredArticles.map((article) => {
          const Icon = article.icon;

          return (
            <button
              key={article.id}
              className="knowledge-card"
              onClick={() => setSelectedArticle(article)}
              type="button"
            >
              <div className="knowledge-card-top">
                <div className="knowledge-card-icon">
                  <Icon size={20} />
                </div>
                <ArrowUpRight size={18} className="knowledge-card-arrow" />
              </div>

              <span className="article-category">{article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.description}</p>

              <div className="knowledge-card-footer">
                <span><Clock3 size={13} /> {article.readTime}</span>
                <span>Read article <ArrowUpRight size={13} /></span>
              </div>
            </button>
          );
        })}
      </div>

      {filteredArticles.length === 0 && (
        <div className="empty-state">
          <Search size={26} />
          <strong>No articles found</strong>
          <p>Try another search term or category.</p>
        </div>
      )}

      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="workspace-modal article-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <span className="article-category">{selectedArticle.category}</span>
                <h2>{selectedArticle.title}</h2>
              </div>
              <button className="table-icon-button" onClick={() => setSelectedArticle(null)} type="button">
                <X size={19} />
              </button>
            </div>

            <p>{selectedArticle.description}</p>

            <div className="article-demo-content">
              <h3>Overview</h3>
              <p>
                This support article provides introductory guidance
                for the selected topic.
              </p>
              <h3>Recommended steps</h3>
              <ul>
                <li>Review the relevant account or application settings.</li>
                <li>Follow the instructions provided by your support team.</li>
                <li>Contact support if the issue remains unresolved.</li>
              </ul>
              <p className="article-demo-note">
                Demonstration article. Replace this content with your
                actual knowledge base documentation.
              </p>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <form className="workspace-modal" onSubmit={createArticle} onClick={(event) => event.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <h2>Create Article</h2>
                <p>Add a resource to the knowledge center.</p>
              </div>
              <button className="table-icon-button" onClick={() => setShowModal(false)} type="button">
                <X size={19} />
              </button>
            </div>

            <label>
              Article title
              <input
                required
                value={articleTitle}
                onChange={(event) => setArticleTitle(event.target.value)}
                placeholder="Enter article title..."
              />
            </label>

            <label>
              Description
              <textarea
                value={articleDescription}
                onChange={(event) => setArticleDescription(event.target.value)}
                placeholder="Write a short description..."
                rows={4}
              />
            </label>

            <div className="modal-actions">
              <button className="secondary-action" type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="primary-action" type="submit">
                <Plus size={16} />
                Create Article
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default KnowledgeBase;
