interface Note {
  title: string;
  content: string;
  updateTime: string;
}

interface Notes {
  [noteId: string]: string; 
}
