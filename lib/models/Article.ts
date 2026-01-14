import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IArticle extends Document {
  slug: string
  title: string
  description: string
  content: string
  author: string
  publishedAt: Date
  updatedAt?: Date
  image?: string
  tags?: string[]
  featured?: boolean
  createdAt: Date
}

const ArticleSchema = new Schema<IArticle>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[a-z0-9-]+$/, // Only lowercase letters, numbers, and hyphens
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      default: 'Vultisig',
    },
    publishedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
    image: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
)

// Index for faster queries
ArticleSchema.index({ slug: 1 })
ArticleSchema.index({ publishedAt: -1 })
ArticleSchema.index({ featured: 1 })

const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema)

export default Article
