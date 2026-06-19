import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import Typography from '@tiptap/extension-typography';
import { Callout, DropCap, MultiColumn, Footnote } from './TiptapEditor';
import { useEffect, useState } from 'react';

export default function TiptapRenderer({ content, fontSize = 'md' }: { content: any, fontSize?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const [resolvedContent, setResolvedContent] = useState<any>(() => {
    if (typeof content === 'string') {
      if (content.startsWith('http') && content.includes('firebasestorage')) return '';
      try { return JSON.parse(content); } catch { return content; }
    }
    return content;
  });

  useEffect(() => {
    const fetchContent = async () => {
      // If content is a URL from Firebase Storage, fetch it
      if (typeof content === 'string' && content.startsWith('http') && content.includes('firebasestorage')) {
        try {
          const res = await fetch(content);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const json = await res.json();
          setResolvedContent(json);
        } catch (e) {
          console.error("Failed to load storage JSON, likely a CORS issue:", e);
          // If fetch fails (CORS), show an error block instead of raw URL
          const errorDoc = {
            type: "doc",
            content: [{ type: "paragraph", content: [{ type: "text", text: "⚠️ تعذر تحميل محتوى المقال من التخزين. قد يعود السبب إلى إعدادات CORS." }] }]
          };
          setResolvedContent(errorDoc);
        }
      } else if (typeof content === 'string') {
        try {
          // Try to parse if it's a JSON string
          const parsed = JSON.parse(content);
          setResolvedContent(parsed);
        } catch {
          setResolvedContent(content);
        }
      } else {
        setResolvedContent(content);
      }
    };
    fetchContent();
  }, [content]);

  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'dropCap', 'callout'],
        defaultAlignment: 'right',
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'rounded-xl mx-auto my-4 max-w-full h-auto shadow-xl',
        },
      }),
      Table.configure({
        HTMLAttributes: {
          class: 'w-full my-6 border-collapse border border-slate-700',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-slate-700 bg-slate-800 p-3 font-bold text-right text-sm',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-slate-700 p-3 text-right text-sm',
        },
      }),
      Typography,
      Callout,
      DropCap,
      MultiColumn,
      Footnote,
    ],
    content: resolvedContent,
  }, [resolvedContent]);

  // Handle updates when content prop changes dynamically
  useEffect(() => {
    if (editor && resolvedContent) {
      if (typeof resolvedContent === 'object') {
        editor.commands.setContent(resolvedContent);
      } else if (typeof resolvedContent === 'string') {
        if (!resolvedContent.startsWith('http')) {
          editor.commands.setContent(resolvedContent);
        }
      }
    }
  }, [resolvedContent, editor]);

  // Dynamic class mapping based on fontSize
  const fontClasses = {
    sm: 'prose-sm',
    md: 'prose-base',
    lg: 'prose-lg',
    xl: 'prose-xl',
  };

  return (
    <div className={`prose max-w-none font-tajawal text-right ${fontClasses[fontSize]}`}>
      <EditorContent editor={editor} />
    </div>
  );
}
