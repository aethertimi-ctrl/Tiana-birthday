Put your music files in this folder.

Supported formats: MP3, M4A, OGG, WAV.

After adding files, open src/data/music.ts and list each song, for example:

  import midnight from '../assets/music/midnight.mp3';

  export const tracks = [
    { title: 'Midnight in Paris', artist: 'Her favorite', src: midnight },
  ];

Each song you list appears automatically in the player on the page.
