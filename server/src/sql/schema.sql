CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);

ALTER TABLE songs ADD COLUMN artist VARCHAR;

UPDATE songs SET artist = 'Ludwig van Beethoven' WHERE id =1;

INSERT INTO songs (id, song_title, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, artist, notes)
VALUES
  (2, 'Moonlight Sonata', 'Ludwig van Beethoven', 'C#4 C#4 C#4 D#4 G#4 A#4 G#4 F#4 F#4 F#4 G#4 C#5 C#5 C#5 D#5 G#5 A#5 G#5 F#5 F#5 F#5 G#5 C#6 C#6 C#6 D#6 G#6 A#6 G#6 F#6 F#6 F#6 G#6'),
  (3, 'Symphony No. 5', 'Ludwig van Beethoven', 'G4 G4 G4 E4 G4 C5 C5 G4 G4 F4 D5 D5 C5 G4 G4 E4 G4 C5 C5 G4 G4 F4 D5 D5 C5 G4 G4 G4 E4 G4 C5 C5 G4 G4 F4 D5 D5 C5 G4 G4 E4 G4 C5 C5 G4 G4 F4 D5 D5 C5'),
  (4, 'Für Elise', 'Ludwig van Beethoven', 'E5 D#5 E5 D#5 E5 B4 D5 C5 A4 A4 C5 E5 E5 C5 D5 E5 D#5 E5 D#5 E5 B4 D5 C5 A4 A4 C5 E5 E5 C5 D5 E5 D#5 E5 D#5 E5 B4 D5 C5 A4 A4 C5');

INSERT INTO songs (id, song_title, artist, notes)
VALUES
  (5, 'Annie''s Song', 'James Galway', 'B4 G4 F#4 G4 B4 G4 F#4 E4 D4 B4 G4 F#4 G4 B4 G4 F#4 E4 D4 B4 G4 F#4 G4 A4 B4 C5 B4 A4 G4 D5 G5 D5 G5 D5 B4 B4 A4 A4 G4 A4 B4 C5 B4 A4 G4'),
  (6, 'The Wind Beneath My Wings', 'James Galway', 'G4 A4 B4 C5 B4 A4 G4 F#4 G4 A4 G4 F#4 E4 D4 C5 B4 A4 G4 F#4 G4 A4 G4 F#4 E4 D4 C5 B4 A4 G4 F#4 G4 A4 G4 F#4 E4 D4'),
  (7, 'Over the Rainbow', 'James Galway', 'A4 B4 C#5 D#5 F#5 G#5 A5 B5 C#6 D#6 F#6 G#6 A6 B6 C#7 D#7 F#7 G#7 A7 B7 C#8 D#8 F#8 G#8 A8 B8 C#9 D#9 F#9 G#9 A9 B9 C#10 D#10 F#10 G#10 A10 B10 C#11 D#11 F#11 G#11 A11 B11 C#12 D#12 F#12 G#12 A12 B12 C#13 D#13 F#13 G#13 A13 B13 C#14 D#14 F#14 G#14'),
  (8, 'Ashokan Farewell', 'James Galway', 'B4 A4 G4 D5 G5 D5 G5 D5 B4 B4 A4 A4 G4 A4 B4 C5 B4 A4 G4 D5 G5 D5 G5 D5 B4 B4 A4 A4 G4 A4 B4 C5 B4 A4 G4'),
  (9, 'Danny Boy', 'James Galway', 'B4 C#5 D5 E5 D5 C#5 B4 A4 G4 F#4 G4 A4 B4 C5 B4 A4 G4 D5 G5 D5 G5 D5 B4 B4 A4 A4 G4 A4 B4 C5 B4 A4 G4')
  ;

INSERT INTO songs (id, song_title, artist, notes)
VALUES
  (10, 'In the Air Tonight', 'Phil Collins', 'F#3 D3 E3 D3 C#3 D3 E3 D3 F#3 D3 E3 D3 C#3 D3 E3 D3 F#3 D3 E3 D3 C#3 D3 E3 D3 F#3 D3 E3 D3 C#3 D3 E3 D3 F#3 D3 E3 D3 C#3 D3 E3 D3 F#3 D3 E3 D3 C#3 D3 E3 D3 F#3 D3 E3 D3 C#3 D3 E3 D3');
  
INSERT INTO songs (id, song_title, artist, notes)
VALUES 
	(11, 'Against All Odds', 'Phil Collins', 'Bb4 Ab4 F4 Gb4 Ab4 F4 Eb4 F4 Eb4 Db4 C4 Bb3 F4 Ab4 Bb4 Ab4 F4 Gb4');
