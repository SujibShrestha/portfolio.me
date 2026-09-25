---
title: "AI Video Summary Assistant"
tags: ["project", "Python", "LangChain", "Chroma DB", "Groq", "Hugging Face", "RAG"]
---

# AI Video Summary Assistant

Sujib Shrestha's AI Video Summary Assistant processes long-form YouTube videos to produce concise summaries and answer questions about their content.

## Problem and approach

Finding specific information in lengthy technical or educational videos can require watching large sections of footage. This assistant processes video transcripts and retrieves relevant context so users can ask questions about the content.

## Processing pipeline

- Automated video transcription and text processing.
- Semantic chunking and vector embeddings using Hugging Face.
- Local vector storage in Chroma DB for similarity search.
- Context-aware question answering using LangChain and Groq AI with LLaMA-3.

Technology stack: Python, LangChain, Chroma DB, Groq AI, and Hugging Face.

Repository: https://github.com/SujibShrestha/video-agent

