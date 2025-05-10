\c chit_chat_app;

INSERT INTO users (
    first_name, last_name, username, password, email, phone_number,
    sex_at_birth, gender_identity, date_of_birth
) VALUES
    ('John', 'Doe', 'johndoe', 'password123', 'johndoe@example.com', '123-456-7890', 'Male', 'Man', '1990-05-15'),
    ('Jane', 'Doe', 'janedoe', 'securepass456', 'janedoe@example.com', '646-123-3224', 'Female', 'Woman', '1988-11-23'),
    ('Bobby', 'Slither', 'bobbyslithers', 'bobbyspassword', 'bobby99@example.com', '902-412-5213', 'Male', 'Non-binary', '1999-02-02'),
    ('Alice', 'White', 'alice_w', 'alice1234', 'alicew@example.com', '678-665-3423', 'Female', 'Woman', '1995-07-10'),
    ('Mike', 'Franks', 'mike88', 'mike_secure', 'mike88@example.com', '796-322-4142', 'Male', 'Man', '1985-12-30');


INSERT INTO podcast_entries (title, description, audio_url, user_id)
VALUES
    ('The Daily Byte', 'Tech news and deep dives.', 'https://example.com/audio/dailybyte.mp3', 1),
    ('Mindful Minutes', 'Short guided meditations for busy people.', 'https://example.com/audio/mindful.mp3', 2),
    ('SlitherCast', 'Gaming reviews and weird facts.', 'https://example.com/audio/slither.mp3', 3),
    ('White Noise', 'Late-night thoughts and music.', 'https://example.com/audio/whitenoise.mp3', 4),
    ('Franks Talks', 'Honest conversations about finance.', 'https://example.com/audio/franks.mp3', 5),
    ('Code & Coffee', 'Dev talk over caffeine.', 'https://example.com/audio/codecoffee.mp3', 1);
