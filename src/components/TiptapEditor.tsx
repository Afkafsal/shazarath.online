import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import Typography from '@tiptap/extension-typography';
import { Bold, Italic, Strikethrough, Heading1, Heading2, List, ListOrdered, Quote, Undo, Redo, AlignLeft, AlignCenter, AlignRight, AlignJustify, ImageIcon, Table as TableIcon } from 'lucide-react';
import { useEffect } from 'react';
import { uploadFileToStorage, resizeAndConvertToWebP } from '../fileUpload';

// Callout extension
import { Node, mergeAttributes } from '@tiptap/core';

export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'inline*',
  parseHTML() {
    return [{ tag: 'div[data-type="callout"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'callout', class: 'p-4 my-4 bg-indigo-50 border-r-4 border-indigo-500 text-indigo-900 rounded-l-lg font-bold' }), 0];
  },
});

// DropCap extension
export const DropCap = Node.create({
  name: 'dropCap',
  group: 'block',
  content: 'inline*',
  parseHTML() {
    return [{ tag: 'p[data-type="dropcap"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(HTMLAttributes, { 'data-type': 'dropcap', class: 'drop-cap pb-2 text-4xl float-right ml-3 text-indigo-700 font-bold leading-none' }), 0];
  },
});

export const MultiColumn = Node.create({
  name: 'multiColumn',
  group: 'block',
  content: 'block+',
  parseHTML() {
    return [{ tag: 'div[data-type="multicolumn"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'multicolumn', class: 'md:columns-2 gap-8' }), 0];
  },
});

export const Footnote = Node.create({
  name: 'footnote',
  inline: true,
  group: 'inline',
  content: 'inline*',
  parseHTML() {
    return [{ tag: 'sup[data-type="footnote"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['sup', mergeAttributes(HTMLAttributes, { 'data-type': 'footnote', class: 'text-xs text-sky-500 cursor-help px-1 bg-slate-800 rounded' }), 0];
  },
});


const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target?.files?.[0];
      if (file) {
        try {
          const webpFile = await resizeAndConvertToWebP(file);
          const url = await uploadFileToStorage(webpFile, `article_images/${Date.now()}_${webpFile.name}`);
          editor.chain().focus().setImage({ src: url }).run();
        } catch (err) {
          alert('Failed to upload image: ' + (err as Error).message);
        }
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-slate-700 bg-slate-900 sticky top-0 z-10 rounded-t-xl">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-slate-800 text-slate-300 ${editor.isActive('bold') ? 'bg-slate-800 text-slate-100' : ''}`} title="Bold"><Bold className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-slate-800 text-slate-300 ${editor.isActive('italic') ? 'bg-slate-800 text-slate-100' : ''}`} title="Italic"><Italic className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded hover:bg-slate-800 text-slate-300 ${editor.isActive('strike') ? 'bg-slate-800 text-slate-100' : ''}`} title="Strike"><Strikethrough className="w-4 h-4" /></button>
      
      <div className="w-px h-6 bg-slate-700 my-auto mx-1" />
      
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded hover:bg-slate-800 text-slate-300 ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-800 text-slate-100' : ''}`} title="Heading 2"><Heading1 className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded hover:bg-slate-800 text-slate-300 ${editor.isActive('heading', { level: 3 }) ? 'bg-slate-800 text-slate-100' : ''}`} title="Heading 3"><Heading2 className="w-4 h-4" /></button>
      
      <div className="w-px h-6 bg-slate-700 my-auto mx-1" />

      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-slate-800 text-slate-300 ${editor.isActive('bulletList') ? 'bg-slate-800 text-slate-100' : ''}`} title="Bullet List"><List className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded hover:bg-slate-800 text-slate-300 ${editor.isActive('orderedList') ? 'bg-slate-800 text-slate-100' : ''}`} title="Ordered List"><ListOrdered className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded hover:bg-slate-800 text-slate-300 ${editor.isActive('blockquote') ? 'bg-slate-800 text-slate-100' : ''}`} title="Quote"><Quote className="w-4 h-4" /></button>
      
      <div className="w-px h-6 bg-slate-700 my-auto mx-1" />

      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-2 rounded hover:bg-slate-800 text-slate-300 ${editor.isActive({ textAlign: 'right' }) ? 'bg-slate-800 text-slate-100' : ''}`} title="Align Right"><AlignRight className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-2 rounded hover:bg-slate-800 text-slate-300 ${editor.isActive({ textAlign: 'center' }) ? 'bg-slate-800 text-slate-100' : ''}`} title="Align Center"><AlignCenter className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-2 rounded hover:bg-slate-800 text-slate-300 ${editor.isActive({ textAlign: 'left' }) ? 'bg-slate-800 text-slate-100' : ''}`} title="Align Left"><AlignLeft className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`p-2 rounded hover:bg-slate-800 text-slate-300 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-slate-800 text-slate-100' : ''}`} title="Justify"><AlignJustify className="w-4 h-4" /></button>

      <div className="w-px h-6 bg-slate-700 my-auto mx-1" />
      
      <button onClick={addImage} className="p-2 rounded hover:bg-slate-800 text-slate-300" title="Add Image"><ImageIcon className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="p-2 rounded hover:bg-slate-800 text-slate-300" title="Add Table"><TableIcon className="w-4 h-4" /></button>

      <div className="w-px h-6 bg-slate-700 my-auto mx-1" />

      <button onClick={() => editor.chain().focus().setNode('callout').run()} className={`px-3 py-1 text-xs rounded hover:bg-slate-800 text-slate-300 font-bold font-tajawal`} title="Callout">تنبيه / اقتباس</button>
      <button onClick={() => editor.chain().focus().setNode('dropCap').run()} className={`px-3 py-1 text-xs rounded hover:bg-slate-800 text-slate-300 font-bold font-tajawal`} title="Drop Cap">حرف استهلالي</button>
      <button onClick={() => editor.chain().focus().setNode('multiColumn').run()} className={`px-3 py-1 text-xs rounded hover:bg-slate-800 text-slate-300 font-bold font-tajawal`} title="Multi Column">أعمدة</button>
      <button onClick={() => editor.chain().focus().toggleNode('footnote', 'paragraph').run()} className={`px-3 py-1 text-xs rounded hover:bg-slate-800 text-slate-300 font-bold font-tajawal`} title="Footnote">هامش</button>

      <div className="w-px h-6 bg-slate-700 my-auto mx-1" />

      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-2 rounded hover:bg-slate-800 text-slate-300 disabled:opacity-50"><Undo className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-2 rounded hover:bg-slate-800 text-slate-300 disabled:opacity-50"><Redo className="w-4 h-4" /></button>
    </div>
  );
};

export default function TiptapEditor({ content, onChange }: { content: any; onChange: (json: any) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'dropCap', 'callout'],
        defaultAlignment: 'right',
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'rounded-xl mx-auto my-4 max-w-full h-auto',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'w-full my-4 border-collapse border border-slate-700',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-slate-700 bg-slate-800 p-2 font-bold text-right',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-slate-700 p-2 text-right',
        },
      }),
      Typography,
      Callout,
      DropCap,
      MultiColumn,
      Footnote,
    ],
    content: (() => {
      if (typeof content === 'string') {
        if (content.startsWith('http') && content.includes('firebasestorage')) return '';
        try { return JSON.parse(content); } catch { return content; }
      }
      return content || '';
    })(),
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-6 font-tajawal text-right',
        dir: 'rtl',
      },
    },
  });
  
  useEffect(() => {
    if (editor && content && !editor.isFocused) {
      if (typeof content === 'string' && content.startsWith('http') && content.includes('firebasestorage')) {
        fetch(content)
          .then(res => res.json())
          .then(json => {
            if (JSON.stringify(editor.getJSON()) !== JSON.stringify(json)) {
              editor.commands.setContent(json);
              onChange(json);
            }
          })
          .catch(e => {
            console.error("Failed to load article content", e);
            editor.commands.setContent(content);
          });
      } else {
        let actualContent = content;
        if (typeof content === 'string') {
          try {
            actualContent = JSON.parse(content);
          } catch {
            actualContent = content;
          }
        }
        
        const currentJson = editor.getJSON();
        if (JSON.stringify(currentJson) !== JSON.stringify(actualContent)) {
          // Only set content if we have a valid object (tiptap doc) or if it's empty
          if (typeof actualContent === 'object') {
             editor.commands.setContent(actualContent);
          } else if (typeof actualContent === 'string') {
            // Fallback if legacy html/text is passed
             editor.commands.setContent(actualContent);
          }
        }
      }
    }
  }, [content, editor]);

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-950 flex flex-col">
      <MenuBar editor={editor} />
      <div className="overflow-y-auto max-h-[600px] cursor-text" onClick={() => editor?.commands.focus()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
