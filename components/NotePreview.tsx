"use client";
import { marked } from "marked";
import React, { useState, useEffect } from "react";
import sanitizeHtml from "sanitize-html";

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  "img",
  "h1",
  "h2",
  "h3",
]);

const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ["alt", "src"],
  }
);

export default function NotePreview({ children }: { children: string }) {
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    // 使用 Promise.resolve 确保处理的统一性，无论 marked 返回的是字符串还是 Promise
    Promise.resolve(marked(children || "")).then((markdownContent) => {
      const cleanHtml = sanitizeHtml(markdownContent, {
        allowedTags,
        allowedAttributes,
      });
      setSafeHtml(cleanHtml);
    });
  }, [children]);

  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: safeHtml,
        }}
      />
    </div>
  );
}
