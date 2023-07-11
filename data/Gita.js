import gitaData from "./gita-data.js";
import gitaSummary from "./gita-summary.js";

export default class Gita {
  constructor() {
    // code
    this.chapterCount = gitaData.chapters.length;
    this.author = gitaData.author;
    this.title = gitaData.title;
  }

  getRandomQuote() {
    const randomChapterIndex =
      Math.random() * (gitaData.chapters.length - 1) + 1;
    const chapter = gitaData.chapters.at(randomChapterIndex);
    const randomVerseIndex = Math.random() * (chapter.verses.length - 1) + 1;
    const verse = chapter.verses.at(randomVerseIndex);

    const newobject = {
      chapter: chapter.chapter_name,
      chapterIndex: chapter.chapter_number,
    };

    return {
      ...verse,
      ...newobject,
    };
  }

  getChapters() {
    return gitaData.chapters;
  }

  getChapter(index) {
    if (index > 18 || index < 0) {
      return new Error("Invalid Index Chapter avalible is 1-18");
    }
    return gitaData.chapters.at(index);
  }

  getVerse(chapterIndex, verseIndex) {
    if (chapterIndex > 18 || chapterIndex < 0) {
      return new Error("Invalid Index Chapter avalible is 1-18");
    }
    const chapter = gitaData.chapters.at(chapterIndex);
    if (verseIndex > chapter.verses.length || verseIndex < 0) {
      return new Error(
        `Invalid Index Verse avalible is 1-${chapter.verses.length}`
      );
    }
    const verse = chapter.verses.at(verseIndex);

    return verse;
  }

  getSummary() {
    return gitaSummary;
  }
}
