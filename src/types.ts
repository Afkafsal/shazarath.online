/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Author {
  id: number;
  name: string;
  bio: string;
  avatarUrl: string;
  role: string; // e.g., "رئيس التحرير", "كاتب مساهم"
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string; // Tailwind color class for badges
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  categoryId: number;
  authorId: number;
  editionId: number | null; // Nullable if not in a specific print edition
  imageUrl: string;
  views: number;
  likes: number;
  readTime: string; // e.g., "5 دقائق"
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  qrCodeUrl?: string;
  tags?: string[];
}

export interface Edition {
  id: number;
  title: string; // e.g., "العدد الأول - رمضان ١٤٤٧"
  coverUrl: string;
  pdfUrl: string;
  publishDate: string;
  description: string;
  downloadCount: number;
  category?: 'نبضة' | 'عروة' | 'عروة الأطفال';
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  publishDate: string;
  isImportant: boolean;
}

export interface CollegeEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  date: string;
}

export interface ActivityLog {
  id: number;
  userName: string;
  action: string;
  ipAddress: string;
  date: string;
}

export interface SystemSetting {
  siteName: string;
  collegeName: string;
  contactEmail: string;
  contactPhone: string;
  aboutText: string;
  submissionGuideUrl: string;
  footerAbout?: string;        // Editable footer description
  footerCopyright?: string;    // Editable footer copyright text
  submissionEmail?: string;    // Editable email for submissions
  articlesSectionTitle?: string;
  editionsSectionTitle?: string;
  eventsSectionTitle?: string;
  gallerySectionTitle?: string;
  creativeSectionBadge?: string;
  creativeSectionTitle?: string;
  creativeSectionDesc?: string;
  creativeSectionBtnSubmit?: string;
  creativeSectionBtnContact?: string;
  instagramUrl?: string;
  whatsappUrl?: string;
  youtubeUrl?: string;
  adminId?: string;
  adminPass?: string;
  poems?: { id: number, lines: string[], author: string }[];
}
